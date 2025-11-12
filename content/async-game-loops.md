---
title: "Why I Chose Async/Await Over Traditional Game Loops"
description: "Building a single-threaded, async-first game architecture"
date: "2025-11-10"
tags: ["gamedev", "architecture", "async", "csharp"]
---

# Why I Chose Async/Await Over Traditional Game Loops

I'm building a match-3 roguelike in C#. When I started writing the engine, I followed the standard approach as I've seen in many tutorials (and what I was taught directly), a synchronous game loop with state machines. Relatively soon I had spaghetti that I did not want to deal with. I tried a few different options to solve the issues I had, and finally landed on an async/await architecture that's way cleaner and simpler for my use case than any of those approaches.

## The Problem With State Machines

My first try used an enum tracking turn phases. I used a classic update loop style for game logic:

```csharp
enum TurnState {
    WaitingForInput, SwappingCells, DetectingMatches,
    RemovingCells, ApplyingGravity, SpawningCells
}

void Update(float deltaTime) {
    stateTimer += deltaTime;

    switch (currentState) {
        case TurnState.SwappingCells:
            UpdateSwapAnimation(deltaTime);
            if (stateTimer > SWAP_DURATION) {
                currentState = TurnState.DetectingMatches;
                stateTimer = 0f;
            }
            break;
        // ...
    }
}
```

This worked mostly fine, if a little messily, until I added cascading matches. When you clear matched cells, new ones fall down and sometimes create more matches, chaining constantly until there are no more matches. I needed to track cascade iteration, animation status, whether to loop back to match detection, and when to end the turn. That meant I had to deal with nested states and logic bunched together (factored out into separate methods, but all the control flow had to be all together and I had a bunch of ugly state).

I tried refactoring this a couple other ways, but ended up going right back- it was a little better to understand but worse to actually work with, since they had some problems (namely, coroutines were pretty good but I had to work around with some huge caveats).

I also outright ignored callbacks as an option.

## The Async Architecture

I ended up deciding on a single-threaded, async-first architecture where async/await is used for timing and sequencing, not parallelism. The game loop runs on one thread targeted to 60 FPS:

```csharp
while (!Raylib.WindowShouldClose()) {
    Update();
    Render();
}
```

Everything happens on this thread- input, game state updates, animation updates, rendering, and async handover. Raylib isn't thread-safe and all rendering must happen on the main thread anyway, so single-threaded makes sense. I didn't have to deal with locking or anything.

The turn system looks like this:

```csharp
async Task RunTurn() {
    isTurnInProgress = true;

    try {
        await AnimateSwap(cell1, cell2);
        board.SwapCells(cell1.Position, cell2.Position);

        var matches = matchDetector.FindMatches();
        if (matches.Count == 0) {
            await AnimateSwap(cell1, cell2);  // Invalid, swap back
            board.SwapCells(cell1.Position, cell2.Position);
            return;
        }

        int cascadeCount = 0;
        while (matches.Count > 0 && cascadeCount < MAX_CASCADES) {
            board.RemoveMatches(matches);
            await ApplyGravityAnimated();
            await SpawnNewCellsAnimated();
            matches = matchDetector.FindMatches();
            cascadeCount++;
        }
    }
    finally {
        isTurnInProgress = false;
    }
}
```

The code reads top to bottom. Swap cells. Check matches. If invalid, swap back. If valid, remove matches and apply gravity until no more matches exist. The flow is immediately clear and I can use normal-ass control flow in a readable way.

## How Async Works Without Threads

The big part that makes it work is `TaskCompletionSource`. When an animation starts, I create a `TaskCompletionSource` and add the animation to a list:

```csharp
public async Task AnimateSwap(Cell a, Cell b, float duration) {
    var tcs = new TaskCompletionSource<bool>();

    var anim1 = new MoveAnimation(a, a.VisualPosition, b.Position, duration);
    var anim2 = new MoveAnimation(b, b.VisualPosition, a.Position, duration);

    var groupAnim = new GroupAnimation(new[] { anim1, anim2 }, () => {
        tcs.SetResult(true);
    });

    activeAnimations.Add(groupAnim);
    await tcs.Task;
}
```

When the await hits, the method yields control back to the caller. The game loop continues running. Each frame, the `AnimationManager` updates:

```csharp
public void Update(float deltaTime) {
    for (int i = activeAnimations.Count - 1; i >= 0; i--) {
        var anim = activeAnimations[i];
        anim.Update(deltaTime);

        if (anim.IsComplete) {
            anim.OnComplete();  // Calls tcs.SetResult(true)
            activeAnimations.RemoveAt(i);
        }
    }
}
```

When the animation completes, it signals the `TaskCompletionSource`, which resumes the awaiting code. The continuation runs on the main thread during the next frame. No background threads, no synchronization, just sequential async code that pauses for animations.

## Visual vs Logical State

Cells track two positions. Logical position is where they exist on the grid for game logic. Visual position is where they currently render during animations:

```csharp
public class Cell {
    public GridCoordinate Position { get; set; }      // Logical
    public Vector2 VisualPosition { get; set; }       // Visual (for rendering)
}
```

Cells always render at their VisualPosition. This separation lets me update the logical board state immediately, in the clean turn logic, while cells animate smoothly to their new positions every frame.

## The Battle Loop

When the battle starts, I start an async loop that handles that specific battle:

```csharp
protected override void OnEnter() {
    // ...
    _ = Task.Run(RunBattle);
}

private async Task RunBattle() {
    battleStarted = true;

    while (battleActive && player.IsAlive && enemy.IsAlive) {
        if (isTurnInProgress && turnCompleteTcs != null) {
            await turnCompleteTcs.Task;
        }

        if (animationManager.HasActiveAnimations) {
            await animationManager.WaitForAllAnimationsAsync();
        }

        if (!player.IsAlive || !enemy.IsAlive) {
            battleActive = false;
            await HandleBattleEnd(!player.IsAlive);
            break;
        }

        if (!isPlayerTurn && battleActive) {
            await HandleEnemyTurnAsync();
        }
    }
}
```

This loop runs on the main thread but only coordinates timing. It waits for turns to complete and animations to finish by awaiting `TaskCompletionSource` objects that get signaled when events occur. The actual execution happens through the normal `Update` cycle.

Originally I naively used `Task.Delay(50)` to hand back control to the controlling logic and poll for completion every 50ms. That wasted CPU and added latency (not much, since it was only between steps that already had some buffer time, but it was unnecessary). I replaced it with event-driven completion using `TaskCompletionSource`:

```csharp
// When animations complete, signal immediately
if (activeAnimations.Count == 0 && allAnimationsCompleteTcs != null) {
    var tcs = allAnimationsCompleteTcs;
    allAnimationsCompleteTcs = null;
    tcs.SetResult(true);  // Resumes awaiting code instantly
}
```

Now the code resumes immediately and I don't have random waiting just to abuse the scheduler. The synchronous Update loop keeps running at the target framerate (60 for now):

```csharp
protected override void OnUpdate() {
    animationManager.Update(Raylib.GetFrameTime());

    if (battleActive && battleStarted) {
        if (isPlayerTurn && !isTurnInProgress && !animationManager.HasActiveAnimations) {
            inputHandler.PollInputEvents();
            ProcessInputEvents();
        }
    }

    UpdateUI();
}
```

Input is only processed when it's the player's turn, no turn is in progress, and no animations are running. This prevents concurrent turn execution, input during animations, and input during enemy turns. Later on, I will have more advanced checks for a pause menu, other kinds of inputs like viewing the map, etc. Right now, for testing, it just drops input until it's ready to have any.

## State Guards and Safety

The architecture avoids locks through some state checks. Flags like `isTurnInProgress` prevent reentrancy (since I only ever want one turn happening at a time):

```csharp
private async void PerformCellSwap(Cell cell1, Cell cell2) {
    if (isTurnInProgress) return;

    selectedCells = (cell1, cell2);
    await RunTurn();
}
```

This is async void, which is fire-and-forget. It launches the turn sequence, returns immediately, and the game loop continues. The turn completes over multiple frames. The guard ensures only one turn runs at a time.

Input is queued and processed synchronously. Events fire handlers sequentially still, not in parallel, meaning it *is* still deterministic.

## When Async Isn't Needed

Not everything should be async. Frame-by-frame logic like physics or rendering stays in Update, and that is still a "traditional" update loop for basic stuff, especially things that require accurate (or semi-accurate) time.

Some Task.Delay calls remain by design- a 1.5 second pause after battle ends lets the player see the result (I'll have a run ending screen later, but I'm still working on it), a random 0.5-1 second delay before enemy turns feels natural (don't tell the players that it's artificial :p), 200ms between cascades gives some feeling of something happening (like impact frames).

## What This Gives Me

The turn system went from 500+ lines of state machine code to about 100 lines that read sequentially. When I add features or fix bugs, the code structure makes it obvious what's happening. The implementation matches how the game plays. This is much easier for my single-threaded brain to grasp, since it's very linearly organised.

I figured async didn't really require threading, it just needs to not happen at the same time- this was somewhat inspired by Javascript being mostly single-threaded but still having async via promises (I got the idea after doing some work in Javascript when I was employed).

If you're building turn-based games or anything with complex sequential logic, async/await on a single thread is worth considering. There's a learning curve with `TaskCompletionSource` and the async mental model, but once you understand it, the code becomes dramatically simpler. This is only really applicable if your game has a much more complex loop- most games where you have a "world" might not be better off using this, since you'll want to be updating pretty much linearly and have a smaller set of things to do each "loop".

### A blog post?

I hope to write more of these in the future. I have a bunch of notes on various topics, which I've wanted to write about, but this ended up being the right thing to write first. Thoughts? Is there anything I can write better? [Send me a message](/contact) and let me know!
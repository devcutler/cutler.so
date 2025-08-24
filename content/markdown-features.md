---
title: "Markdown Features Demo"
description: "A comprehensive demonstration of markdown features supported by remark-gfm"
date: "2025-01-15"
tags: ["markdown", "demo", "features"]
---

# Markdown Features Demo

This page demonstrates various markdown features supported by our blog system.

## Basic Text Formatting

**Bold text** and *italic text* and ***bold italic text***.

~~Strikethrough text~~ is also supported.

`Inline code` with backticks.

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

### Task Lists (GitHub-style)
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Another incomplete task

## Code Blocks

### JavaScript
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to the blog, ${name}`;
}

const message = greet("World");
```

### TypeScript
```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const createUser = (data: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...data
  };
};
```

### Bash
```bash
#!/bin/bash
echo "Setting up the project..."
pnpm install
pnpm build
echo "Done!"
```

## Links and Images

[External link to React](https://reactjs.org)

[Internal link to test page](/blog/test-page)

Auto-link: https://github.com/vikejs/vike

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | H1-H6 |
| Lists | ✅ | Ordered, unordered, tasks |
| Code | ✅ | Inline and blocks |
| Tables | ✅ | With alignment |
| Links | ✅ | Internal and external |

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Content | Content | Content |
| More | More | More |

## Blockquotes

> This is a simple blockquote.

> This is a multi-line blockquote.
> It can span multiple lines and will
> be rendered as a single block.

> **Note:** You can use other markdown inside blockquotes.
> 
> - Like lists
> - And `inline code`

## GitHub-Style Alert Blocks

> [!NOTE]
> This is a note. It provides general information or clarifications.

> [!TIP]
> This is a tip. It offers helpful suggestions or best practices.

> [!IMPORTANT]
> This is important information that shouldn't be ignored.

> [!WARNING]
> This is a warning. It alerts about potential issues or risks.

> [!CAUTION]
> This is a caution block. It warns about serious risks or dangerous actions.

## Horizontal Rules

---

Above and below this text are horizontal rules.

***

Different syntax, same result.

## Emojis

Thanks to remark-gemoji, you can use GitHub-style emojis:

- :smile: `:smile:`
- :rocket: `:rocket:`
- :heart: `:heart:`
- :thumbsup: `:thumbsup:`
- :warning: `:warning:`
- :information_source: `:information_source:`

## Advanced GitHub Features

### Footnotes
Here's a sentence with a footnote[^1].

And here's another one[^note].

[^1]: This is the first footnote.
[^note]: This is a named footnote.

### Syntax Highlighting in Diff
```js:diff
  function example() {
-   console.log("old code");
+   console.log("new code");
    return true;
  }
```

### Mathematical Expressions (if supported)
Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## Escape Characters

You can escape special characters with backslashes:

\*Not italic\* \**Not bold\** \`Not code\`

\> Not a blockquote

\## Not a header

## HTML in Markdown

<div style="background: #f0f0f0; padding: 16px; border-radius: 8px;">
  <strong>Note:</strong> Some HTML is allowed in markdown, but use sparingly for best compatibility.
</div>

---

This concludes the markdown features demonstration. Most of these features should work out of the box with remark-gfm!
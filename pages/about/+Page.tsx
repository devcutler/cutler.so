import { User, Code, Globe, Zap, Coffee, Heart, Lightbulb, Terminal, MessageCircle } from 'lucide-react';
import { TypeScript, Python, ReactJS, Vite, VSCode, Docker, Vike } from '@cutler/icons';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { RainbowText } from '@/components/RainbowText';
import { Badge } from '@/components/Badge';
import { Block, BlockContent } from '@/components/Block';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Grid } from '@/components/Grid';
import { Alert } from '@/components/Alert';
import { List, ListItem } from '@/components/List';
import { Icon } from '@/components/Icon';
import { Title, Heading, Subheading, Text } from '@/components/Text';


export default function Page() {
  return (
    <Content>
      <Section>
        <header className="text-center mb-12">
          <Title className="flex items-center justify-center gap-3">
            <User /> About Me
          </Title>
          <Text className="text-muted-foreground">
            Welcome to my personal corner of the web.
          </Text>
        </header>

        <Subheading>
          <Icon icon={Coffee} /> Background
        </Subheading>
        <Text>
          I'm a software developer who loves to learn and loves to play with new tech.
          I started programming in some capacity when I was a kid, and have been
          constantly growing my knowledge and experience since then.
        </Text>

        <Subheading>
          <Icon icon={Code} /> What I Do
        </Subheading>
        <Accordion>
          <AccordionItem title="Web">
            <Text>
              I do a lot of my smaller projects on web platforms, because it's incredibly easy to get started-
              I have all the tools I need to easily build something up that works. If I just need a
              little UI to do something simple, I'd write some JavaScript, throw some HTML together, and
              make it work.
            </Text>
            <Text>
              If I'm going to make something nice, it'll generally be with React and Tailwind, as I have a
              very different experience in developing with it. React and Tailwind allow me to keep styling
              where it is semantically, in each component, which allows me to focus better on how each component looks,
              but not have to mentally process every single component every single time I want to change something.
              I end up building a lot of similar components because of how easy it is to do with Tailwind, but I'm okay with that.
              It works and looks nicer than if I were doing it otherwise.
            </Text>
          </AccordionItem>

          <AccordionItem title="Games">
            <Text>
              I do game development in C#, largely using Monogame. I really like exploring
              the inner workings of games, so I don't often use game engines- I prefer to
              build from scratch. It ends up taking me a lot longer, but I think it's worth it.
              I use Monogame (a re-construction of XNA) because it gives me enough control to do
              what I want to, while providing a base to build on- it's kind of like an engine
              in that I don't have to do my drawing manually to the screen, as SDL is a lot of work,
              but it's barebones enough that I get to do most of the work myself.
            </Text>
          </AccordionItem>

          <AccordionItem title="Tools">
            <Text>
              I make a lot of tools for myself, often little command-line things that run some complex task or
              handle data in a particular way. For example, whenever I have to move around large amounts of files, or rename
              them in particular ways, or check their content for something, I almost never do it manually- it'd take far longer
              than just writing a script.
            </Text>
            <Text>
              For example, I once wanted to have an easy reminder system, that would prompt me
              every time I turned on my computer, but not be obtrusive or distracting, since the reminders weren't urgent.
              I wrote a little tool that would read a JSON file every time my computer booted and throw up a native window with
              the content, the time I'd entered it, and an optional "due time" that I needed to address it by. The command line
              for it was <code>remindme "buy extra cable for headphones"</code>, and when called without any arguments, it'd throw up
              the windows. That way, I could have it called automatically on startup (I made a shortcut in shell:startup) and it would
              handle itself.
            </Text>
            <Text>
              I could certainly use off-the-shelf tools for this, but they'd often be slightly outside of my taste, or I'd have some
              preference that didn't perfectly align with how they were structured. I've learned that it's often best to do it myself,
              and I'm willing to put in work for the tools I use daily to work how I want them to.
            </Text>
          </AccordionItem>
        </Accordion>

        <Alert variant="tip" title="Current Focus" icon={<Lightbulb size={16} />}>
          <Text>Right now I'm particularly interested in static site generation and component-driven development.</Text>
        </Alert>

        <Section>
          <Heading>
            <Icon icon={Terminal} /> Technologies & Tools
          </Heading>
          <Accordion>
            <AccordionItem title="Programming Languages">
              <Grid>
                <Badge variant="large" href="https://www.typescriptlang.org/">
                  <Icon icon={TypeScript} size={20} />TypeScript
                </Badge>
                <Badge variant="large" href="https://www.python.org/">
                  <Icon icon={Python} size={20} /> Python
                </Badge>
              </Grid>
            </AccordionItem>

            <AccordionItem title="Frameworks & Libraries">
              <Grid>
                <Badge variant="large" href="https://react.dev/">
                  <Icon icon={ReactJS} size={20} />React
                </Badge>
                <Badge variant="large" href="https://vitejs.dev/">
                  <Icon icon={Vite} size={20} />Vite
                </Badge>
                <Badge variant="large" href="https://vike.dev/">
                  <Icon icon={Vike} size={20} /><RainbowText>Vike</RainbowText>
                </Badge>
              </Grid>
            </AccordionItem>

            <AccordionItem title="Tools & Software">
              <Grid>
                <Badge variant="large" href="https://code.visualstudio.com/">
                  <Icon icon={VSCode} size={20} /><RainbowText>VSCode</RainbowText>
                </Badge>
                <Badge variant="large" href="https://www.docker.com/">
                  <Icon icon={Docker} size={20} />Docker
                </Badge>
              </Grid>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section>
          <Heading>
            <Icon icon={Heart} /> Interests & Focus Areas
          </Heading>

          <Alert variant="note" title="Learning Journey" icon={<Lightbulb size={16} />} className="mb-6">
            <Text>These are technologies I'm actively looking to learn or get more familiar with in the near future.</Text>
          </Alert>

          <Grid width={2}>
            <Block className="p-6">
              <BlockContent>
                <Subheading>
                  <Icon icon={Globe} /> Web Development
                </Subheading>
                <List>
                  <ListItem>Static Site Generation (SSG)</ListItem>
                  <ListItem>DOM Reconciliation</ListItem>
                  <ListItem>Component Architecture</ListItem>
                </List>
              </BlockContent>
            </Block>

            <Block className="p-6">
              <BlockContent>
                <Subheading>
                  <Icon icon={Zap} /> Tools
                </Subheading>
                <List>
                  <ListItem>NextJS ISR</ListItem>
                  <ListItem>TanStack Query</ListItem>
                  <ListItem>Sanity CMS</ListItem>
                </List>
              </BlockContent>
            </Block>
          </Grid>
        </Section>

        <Block className="text-center">
          <BlockContent>
            <Heading>Get in Touch</Heading>
            <Text className="mb-6 text-muted-foreground">
              Feel free to reach out if you'd like to collaborate on a project or just want to chat about technology.
            </Text>
            <a href="/contact" className="button inline-flex items-center gap-2">
              <MessageCircle size={16} />
              Send me a message
            </a>
          </BlockContent>
        </Block>
      </Section>
    </Content >
  );
}
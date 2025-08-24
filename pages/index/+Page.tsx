import { useData } from 'vike-react/useData';
import { User, Rocket, FileText, Mail, Palette, Pencil } from 'lucide-react';
import { Link } from '@/components/Link';
import { Content } from '@/components/Content';
import { Section } from '@/components/Section';
import { Block, BlockContent } from '@/components/Block';
import { Grid } from '@/components/Grid';
import { Icon } from '@/components/Icon';
import { Title, Heading, Subheading, Text } from '@/components/Text';
import type { BlogEntry } from '@/types/blog';

export default function Page() {
  const { latestPost, buildTime } = useData<{
    latestPost: BlogEntry | null;
    buildTime: string;
  }>();

  return (
    <Content className="max-w-6xl">
      <Section className="mb-12">
        <Title>Welcome to cutler.so</Title>
        <Text>
          This site is built with Vike, React, and TypeScript as a statically generated
          multi-page application. Every page is pre-rendered at build time for optimal
          performance and SEO, while still maintaining full React interactivity when needed.
        </Text>
        <Text className="text-sm text-muted-foreground">
          Built on {new Date(buildTime).toLocaleDateString()} at {new Date(buildTime).toLocaleTimeString()}
        </Text>
      </Section>

      <Section className="mb-8">
        <Grid width={2} height={2} gap={6}>
          <Link href="/about" className="block">
            <Block className="hover:shadow-lg transition-shadow h-full">
              <BlockContent>
                <Subheading className="mb-2">
                  <Icon icon={User} /> Personal Information
                </Subheading>
                <Text className="text-muted-foreground">Learn more about me, my background, and what I do.</Text>
              </BlockContent>
            </Block>
          </Link>

          <Link href="/about/projects" className="block">
            <Block className="hover:shadow-lg transition-shadow h-full">
              <BlockContent>
                <Subheading className="mb-2">
                  <Icon icon={Rocket} /> My Projects
                </Subheading>
                <Text className="text-muted-foreground">Explore the projects I've worked on and built.</Text>
              </BlockContent>
            </Block>
          </Link>

          <Link href="/contact" className="block">
            <Block className="hover:shadow-lg transition-shadow h-full">
              <BlockContent>
                <Subheading className="mb-2">
                  <Icon icon={Mail} /> Send me a message
                </Subheading>
                <Text className="text-muted-foreground">Got a question or want to collaborate? Let's connect.</Text>
              </BlockContent>
            </Block>
          </Link>
          
          <Link href="/contact" className="block">
            <Block className="hover:shadow-lg transition-shadow h-full">
              <BlockContent>
                <Subheading className="mb-2">
                  <Icon icon={Pencil} /> Read my blog
                </Subheading>
                <Text className="text-muted-foreground">I write about my regular experiences and explorations with tech</Text>
              </BlockContent>
            </Block>
          </Link>

        </Grid>
      </Section>

      <Section className="mb-8">
        <Link href={latestPost?.path || "/blog"} className="block">
          <Block className="hover:shadow-lg transition-shadow">
            <BlockContent>
              <Heading>
                <Icon icon={FileText} /> Latest Post
              </Heading>

              {latestPost && (
                <>
                  <Subheading>{latestPost.title}</Subheading>

                  {latestPost.description && (
                    <Text>{latestPost.description}</Text>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {latestPost.date && (
                      <time className="text-sm text-muted-foreground" dateTime={latestPost.date.toISOString()}>
                        {latestPost.date.toLocaleDateString()}
                      </time>
                    )}

                    {latestPost.tags && latestPost.tags.length > 0 && (
                      <div className="flex gap-2">
                        {latestPost.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="badge text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </BlockContent>
          </Block>
        </Link>
      </Section>

      <Block>
        <BlockContent>
          <Heading>
            <Icon icon={Palette} /> Theme System
          </Heading>
          <Text>
            This site features 5 dynamic themes that completely transform the appearance while maintaining functionality.
            Each theme provides a unique visual experience showcasing different design approaches.
          </Text>
          <Text>
            Use the settings button in the bottom-left corner to switch between Modern, Terminal, Neumorphic, NieR, and GNOME themes!
          </Text>
        </BlockContent>
      </Block>
    </Content>
  );
}
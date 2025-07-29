import { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { useMeta } from '../hooks/useMeta';
import { useTheme } from '../contexts/ThemeContext';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { BlogPostTerminal } from '../components/BlogPostTerminal';
import { BlogPostCard } from '../components/BlogPostCard';
import type { ContentItem } from '../types/content';

export function BlogListPage() {
  const { blog, getContentBySlug } = useContent();
  const { theme } = useTheme();
  const [blogIndex, setBlogIndex] = useState<ContentItem | null>(null);

  useEffect(() => {
    async function loadBlogIndex() {
      const content = await getContentBySlug('/blog');
      setBlogIndex(content);
    }
    loadBlogIndex();
  }, [getContentBySlug]);

  useMeta({
    title: 'Blog - cutler.so',
    description: 'My thoughts and writings',
    ogTitle: 'Blog',
    ogDescription: 'My thoughts and writings',
    ogUrl: 'https://cutler.so/blog'
  });

  const getContainerClasses = () => {
    switch (theme) {
      case 'terminal':
        return 'space-y-8';
      case 'neumorphic':
        return 'space-y-8';
      case 'nier':
        return 'space-y-8';
      case 'gnome':
        return 'space-y-8';
      default:
        return 'space-y-8';
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case 'terminal':
        return 'bg-transparent border-none shadow-none p-0';
      case 'neumorphic':
        return 'neumorph-card p-8';
      case 'nier':
        return 'nier-card p-8';
      case 'gnome':
        return 'gnome-card p-8';
      default:
        return 'modern-card p-8';
    }
  };

  const getArticleClasses = () => {
    switch (theme) {
      case 'terminal':
        return 'bg-transparent border-none shadow-none p-0 hover:bg-transparent mb-8';
      case 'neumorphic':
        return 'neumorph-card p-6 hover:shadow-lg';
      case 'nier':
        return 'nier-card p-6 hover:scale-102 transition-transform';
      case 'gnome':
        return 'gnome-card p-6 hover:bg-purple-800 transition-colors';
      default:
        return 'modern-card-sm p-6 hover:shadow-md';
    }
  };

  const renderBlogPosts = () => {
    if (blog.length === 0) {
      return (
        <div className={`${getCardClasses()} text-center`}>
          <p style={{ color: 'var(--text-secondary)' }}>No blog posts yet.</p>
        </div>
      );
    }

    switch (theme) {
      case 'terminal':
      case 'gnome':
        return <BlogPostTerminal posts={blog} />;

      case 'neumorphic':
      case 'nier':
      case 'modern':
      default:
        return blog.map(post => (
          <BlogPostCard
            key={post.slug}
            post={post}
            theme={theme}
            articleClasses={getArticleClasses()}
          />
        ));
    }
  };

  return (
    <div className={getContainerClasses()}>
      {blogIndex && (
        <article className={getCardClasses()}>
          <MarkdownRenderer content={blogIndex.content} />
        </article>
      )}

      <div className="space-y-6">
        {renderBlogPosts()}
      </div>
    </div>
  );
}
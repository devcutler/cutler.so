import type { ContentIndexItem } from '../types/content';
import type { ThemeType } from '../types/theme';
import { formatDate } from '../utils/dateUtils';

interface BlogPostCardProps {
  post: ContentIndexItem;
  theme: ThemeType;
  articleClasses: string;
}

export function BlogPostCard({ post, theme, articleClasses }: BlogPostCardProps) {
  return (
    <article className={`${articleClasses} transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            <a
              href={post.slug}
              className="accent-color hover:underline transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </a>
          </h2>

          {post.description && (
            <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
              {post.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {post.date && (
              <time>
                {formatDate(post.date)}
              </time>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-1">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded text-xs transition-colors ${getTagClasses(theme)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function getTagClasses(theme: ThemeType): string {
  switch (theme) {
    case 'neumorphic':
      return 'neumorph-inset';
    case 'nier':
      return 'bg-gray-800 text-gray-100 border-2 border-gray-800';
    case 'gnome':
      return 'bg-purple-800 text-gray-100 border border-purple-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
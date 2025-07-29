import { TerminalPrompt } from './TerminalPrompt';
import type { ContentIndexItem } from '../types/content';
import { formatDateShort } from '../utils/dateUtils';

interface BlogPostTerminalProps {
  posts: ContentIndexItem[];
}

export function BlogPostTerminal({ posts }: BlogPostTerminalProps) {
  return (
    <div>
      <TerminalPrompt 
        command="ls --fancy"
        className="mb-4"
      />
      
      {posts.map(post => (
        <div key={post.slug} className="font-mono text-sm mb-4">
          <div>
            <span className="text-blue-400">-r--r--r--</span>
            <span className="text-white ml-2">1 cutler cutler</span>
            <span className="text-green-400 ml-4 w-12 inline-block">
              {post.length.toLocaleString()}
            </span>
            <span className="text-yellow-400 ml-2 w-16 inline-block">
              {post.date && formatDateShort(post.date)}
            </span>
            <span className="text-cyan-400 ml-2">
              <a
                href={post.slug}
                className="hover:text-cyan-300 transition-colors underline"
              >
                {post.title}
              </a>
            </span>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="text-yellow-400 ml-20">
              [{post.tags.map(tag => `#${tag}`).join(' ')}]
            </div>
          )}
          
          {post.description && (
            <div className="text-gray-400 ml-20">
              {post.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
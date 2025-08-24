import React, { useMemo } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import rehypeHighlightServer from '../utils/rehype-highlight-server';
import rehypeReact from 'rehype-react';
import * as runtime from 'react/jsx-runtime';
import { visit } from 'unist-util-visit';
import { Info, Lightbulb, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';
import '../styles/highlight.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const AlertComponents = {
  'markdown-alert': ({ type, children }: { type: string; children: React.ReactNode }) => {
    const alertIcons = {
      note: Info,
      tip: Lightbulb,
      important: AlertCircle,
      warning: AlertTriangle,
      caution: ShieldAlert
    };

    const alertTitles = {
      note: 'Note',
      tip: 'Tip',
      important: 'Important',
      warning: 'Warning',
      caution: 'Caution'
    };

    const IconComponent = alertIcons[type as keyof typeof alertIcons];
    const title = alertTitles[type as keyof typeof alertTitles];

    if (!IconComponent || !title) return <div>{children}</div>;

    return (
      <div className={`markdown-alert markdown-alert-${type} alert-${type}`}>
        <p className="markdown-alert-title">
          <IconComponent className="alert-icon" />
          {title}
        </p>
        {children}
      </div>
    );
  },
};

function remarkGithubAlerts() {
  return (tree: any) => {
    visit(tree, 'blockquote', (node) => {
      if (!node.children || node.children.length === 0) return;
      
      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph' || !firstChild.children) return;
      
      const firstText = firstChild.children[0];
      if (firstText.type !== 'text') return;
      
      const alertMatch = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
      if (!alertMatch) return;
      
      const alertType = alertMatch[1].toLowerCase();
      
            firstText.value = firstText.value.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/, '');
      
            if (!firstText.value.trim()) {
        node.children.shift();
      }
      
            node.type = 'element';
      node.tagName = 'markdown-alert';
      node.properties = { type: alertType };
      node.data = {
        hName: 'markdown-alert',
        hProperties: { type: alertType }
      };
    });
  };
}



export function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const renderedContent = useMemo(() => {
    try {
      const result = remark()
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkGithubAlerts)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlightServer)
        .use(rehypeReact, {
          jsx: runtime.jsx,
          jsxs: runtime.jsxs,
          Fragment: runtime.Fragment,
          components: AlertComponents,
        })
        .processSync(content);

      return result.result;
    } catch (error) {
      console.error('Error processing markdown:', error);
      return <p>Error rendering content</p>;
    }
  }, [content]);

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {renderedContent}
    </div>
  );
}
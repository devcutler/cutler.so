import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import rehypeHighlightServer from '../../../src/utils/rehype-highlight-server';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export type BlogPost = {
  title: string;
  description: string;
  content: string;
  htmlContent: string;
  date?: string;
  tags?: string[];
  slug: string;
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
      node.tagName = 'div';
      node.properties = { 
        className: [`markdown-alert`, `markdown-alert-${alertType}`, `alert-${alertType}`]
      };
      
            const titleElement = {
        type: 'element',
        tagName: 'p',
        properties: { className: ['markdown-alert-title'] },
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: { className: ['alert-icon'] },
            children: []
          },
          { type: 'text', value: alertType.charAt(0).toUpperCase() + alertType.slice(1) }
        ]
      };
      
      node.children.unshift(titleElement);
    });
  };
}

export const data = async (pageContext: PageContextServer) => {
  const config = useConfig();
  const { slug } = pageContext.routeParams;
  
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  
  const title = frontmatter.title || 'Untitled';
  const description = frontmatter.description || '';
  
    const result = remark()
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkGithubAlerts)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlightServer)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(content);
  
  const htmlContent = result.toString();
  
  config({
    title: `${title} - cutler.so`,
    description,
  });
  
  return {
    title,
    description,
    content,
    htmlContent,
    date: frontmatter.date,
    tags: frontmatter.tags || [],
    slug,
  };
};
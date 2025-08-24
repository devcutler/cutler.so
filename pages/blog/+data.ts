import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogEntry } from '@/types/blog';

export async function data() {
  const contentDir = path.join(process.cwd(), 'content');
  
  if (!fs.existsSync(contentDir)) {
    return { blogPosts: [] };
  }

  const files = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(fileContent);
      
      const slug = file.replace('.md', '');
      
      const blogEntry: BlogEntry = {
        slug,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        date: new Date(frontmatter.date),
        tags: frontmatter.tags || [],
        content,
        path: `/blog/${slug}`,
        length: content.length,
      };
      
      return blogEntry;
    })
        .sort((a, b) => {
      if (a.date && b.date) {
        return b.date.getTime() - a.date.getTime();
      }
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      return a.title.localeCompare(b.title);
    });

  return {
    blogPosts: files
  };
}
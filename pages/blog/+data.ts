import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogEntry } from '@/types/blog';

interface Data {
	blogPosts: BlogEntry[]
}

export async function data(): Promise<Data> {
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
				date: frontmatter.date,
				tags: frontmatter.tags || [],
				content,
				path: `/blog/${slug}`,
				length: content.length,
			};
      
			return blogEntry;
		})
		.sort((a, b) => {
			if (a.date && b.date) {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			}
			if (a.date && !b.date) return -1;
			if (!a.date && b.date) return 1;
			return a.title.localeCompare(b.title);
		});

	return {
		blogPosts: files,
	};
}
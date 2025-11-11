import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PageContextServer } from 'vike/types';


export type BlogPost = {
	title: string;
	description: string;
	content: string;
	date?: string;
	tags?: string[];
	slug: string;
};

export const data = async (pageContext: PageContextServer): Promise<BlogPost> => {
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

	return {
		title,
		description,
		content,
		date: frontmatter.date,
		tags: frontmatter.tags || [],
		slug,
	};
};
import fs from 'fs';
import path from 'path';

export async function onBeforePrerenderStart(): Promise<string[]> {
	const contentDir = path.join(process.cwd(), 'content');
  
	const files = fs.readdirSync(contentDir)
		.filter(file => file.endsWith('.md'))
		.map(file => file.replace('.md', ''));
  
	const urls = files.map(slug => `/blog/${slug}`);
  
	return urls;
}
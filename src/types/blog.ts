export interface BlogEntry {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags?: string[];
	content: string;
	path: string;
	length: number;
}
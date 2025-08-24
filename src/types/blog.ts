export interface BlogEntry {
	slug: string;
	title: string;
	description: string;
	date: Date;
	tags?: string[];
	content: string;
	path: string;
	length: number;
}
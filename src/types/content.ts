export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  content: string;
  path: string;
  length: number;
}

export interface ContentManifest {
  pages: ContentItem[];
  blog: ContentItem[];
}

export interface ContentIndex {
  pages: ContentIndexItem[];
  blog: ContentIndexItem[];
}

export interface ContentIndexItem {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  length: number;
}
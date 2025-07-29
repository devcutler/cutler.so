import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  content: string;
  path: string;
  length: number;
}

interface ContentManifest {
  pages: ContentItem[];
  blog: ContentItem[];
}

interface ContentIndex {
  pages: ContentIndexItem[];
  blog: ContentIndexItem[];
}

interface ContentIndexItem {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  length: number;
}

function processMarkdownFile(filePath: string, relativePath: string): ContentItem {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  let slug = relativePath
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/^\//, '');

  if (slug === 'index' || slug === '') {
    slug = '/';
  } else {
    slug = `/${slug}`;
  }

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date,
    tags: data.tags || [],
    content: markdownContent,
    path: relativePath,
    length: markdownContent.length,
  };
}

function processDirectory(dir: string, baseDir: string): ContentItem[] {
  const items: ContentItem[] = [];

  function walkDir(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const relativePath = path.relative(baseDir, fullPath);
        items.push(processMarkdownFile(fullPath, relativePath));
      }
    }
  }

  walkDir(dir);
  return items;
}

function main() {
  const contentDir = path.join(process.cwd(), 'content');
  const srcOutputDir = path.join(process.cwd(), 'src', 'data');
  const distDir = path.join(process.cwd(), 'dist');
  const distContentDir = path.join(distDir, 'content');

  fs.mkdirSync(srcOutputDir, { recursive: true });

  if (fs.existsSync(distDir)) {
    const filesToClean = ['content-index.json', 'content.json', 'rss.xml'];
    filesToClean.forEach(file => {
      const filePath = path.join(distDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    if (fs.existsSync(distContentDir)) {
      fs.rmSync(distContentDir, { recursive: true, force: true });
    }
  }

  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(distContentDir, { recursive: true });

  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const publicFiles = fs.readdirSync(publicDir);
    publicFiles.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    console.log(`Copied ${publicFiles.length} static assets from public/ to dist/`);
  }

  const allContent = processDirectory(contentDir, contentDir);

  const blog = allContent.filter(item => item.path.startsWith('blog/') && !item.path.endsWith('blog/index.md'));
  const pages = allContent.filter(item => !item.path.startsWith('blog/') || item.path.endsWith('blog/index.md'));

  blog.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  [...pages, ...blog].forEach(item => {
    const filename = item.slug.replace(/\//g, '_').replace(/^_/, '') + '.json';
    const filePath = path.join(distContentDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2));
  });

  const contentIndex: ContentIndex = {
    pages: pages.map(item => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      date: item.date,
      tags: item.tags,
      length: item.length
    })),
    blog: blog.map(item => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      date: item.date,
      tags: item.tags,
      length: item.length
    }))
  };

  const indexContent = JSON.stringify(contentIndex, null, 2);

  fs.writeFileSync(
    path.join(srcOutputDir, 'content-index.json'),
    indexContent
  );

  fs.writeFileSync(
    path.join(distDir, 'content-index.json'),
    indexContent
  );

  const manifest: ContentManifest = { pages, blog };
  const manifestContent = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(path.join(srcOutputDir, 'content.json'), manifestContent);
  fs.writeFileSync(path.join(distDir, 'content.json'), manifestContent);

  if (blog.length > 0) {
    const feed = new RSS({
      title: 'cutler.so',
      description: 'My thoughts and writings',
      feed_url: 'https://cutler.so/rss.xml',
      site_url: 'https://cutler.so',
      language: 'en',
      pubDate: new Date(),
      ttl: 60,
    });

    blog.forEach(post => {
      feed.item({
        title: post.title,
        description: post.description || post.content.substring(0, 200) + '...',
        url: `https://cutler.so${post.slug}`,
        guid: post.slug,
        date: post.date ? new Date(post.date) : new Date(),
        categories: post.tags || [],
      });
    });

    fs.writeFileSync(
      path.join(distDir, 'rss.xml'),
      feed.xml({ indent: true })
    );

    console.log(`Generated RSS feed with ${blog.length} posts`);
  }

  // Copy content files to public/ so Vite includes them in the build
  const publicContentDir = path.join(publicDir, 'content');
  
  // Ensure public/content directory exists
  fs.mkdirSync(publicContentDir, { recursive: true });
  
  // Copy content files to public/
  [...pages, ...blog].forEach(item => {
    const filename = item.slug.replace(/\//g, '_').replace(/^_/, '') + '.json';
    const srcPath = path.join(distContentDir, filename);
    const destPath = path.join(publicContentDir, filename);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
  
  // Copy index files to public/
  if (fs.existsSync(path.join(distDir, 'content-index.json'))) {
    fs.copyFileSync(
      path.join(distDir, 'content-index.json'),
      path.join(publicDir, 'content-index.json')
    );
  }
  
  if (fs.existsSync(path.join(distDir, 'rss.xml'))) {
    fs.copyFileSync(
      path.join(distDir, 'rss.xml'),
      path.join(publicDir, 'rss.xml')
    );
  }

  console.log(`Processed ${pages.length} pages and ${blog.length} blog posts`);
  console.log(`Created ${pages.length + blog.length} individual content files`);
  console.log(`Copied content files to public/ for Vite build`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processMarkdownFile, processDirectory };
export type { ContentItem, ContentManifest };
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import csharp from 'highlight.js/lib/languages/csharp';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { rehypeHighlightServer } from '@/utils/rehype-highlight-server';
import rehypeReact from 'rehype-react';
import * as runtime from 'react/jsx-runtime';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('csharp', csharp);


interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps): ReactElement {
	const renderedContent = useMemo(() => {
		const result = remark()
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeHighlightServer)
			.use(rehypeReact, {
				jsx: runtime.jsx,
				jsxs: runtime.jsxs,
				Fragment: runtime.Fragment,
			})
			.processSync(content);

		return result.result;
	}, [ content ]);

	return <div className={`prose ${className}`}>{renderedContent}</div>;
}
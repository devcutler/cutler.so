import { visit } from 'unist-util-visit';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('bash', bash);

export default function rehypeHighlightServer() {
	return (tree: any) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'pre') {
				const codeNode = node.children?.find((child: any) => child.tagName === 'code');
				if (codeNode && codeNode.children?.[0]?.type === 'text') {
					const code = codeNode.children[0].value;
					const className = codeNode.properties?.className?.[0] || '';
					const language = className.replace('language-', '') || 'text';

					try {
						let highlightedCode;
						if (language && language !== 'text' && hljs.getLanguage(language)) {
							const result = hljs.highlight(code, { language });
							highlightedCode = result.value;
						} else {
							highlightedCode = code;
						}

						codeNode.children = [];
						codeNode.properties = {
							...codeNode.properties,
							className: [ 'hljs', `language-${language}` ],
							dangerouslySetInnerHTML: { __html: highlightedCode },
						};
					} catch (error) {
						console.warn('Highlight.js failed:', error);
					}
				}
			}
		});
	};
}
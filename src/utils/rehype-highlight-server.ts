import type { Root, Properties, Element } from 'hast';
import { isElement } from 'hast-util-is-element';
import hljs from 'highlight.js';
import { visit } from 'unist-util-visit';

export function rehypeHighlightServer() {
	return (tree: Root) => {
		visit(tree, (node): node is Element => isElement(node, 'pre'), (preNode) => {
			const codeNode = preNode.children.find(
				(child): child is Element => isElement(child, 'code'),
			);
			if (!codeNode) return;

			const firstChild = codeNode.children[0];
			if (!firstChild || firstChild.type !== 'text') return;

			const code = firstChild.value;

			const prop = codeNode.properties?.className;
			const className =
				Array.isArray(prop)
					? String(prop[0])
					: typeof prop === 'string'
						? prop
						: '';

			const language = className.replace(/^language-/, '') || 'text';

			try {
				const isKnownLanguage =
					language !== 'text' && hljs.getLanguage(language);

				const highlightedCode = isKnownLanguage
					? hljs.highlight(code, { language }).value
					: code;

				codeNode.children = [];
				codeNode.properties = {
					...codeNode.properties,
					className: [ 'hljs', `language-${language}` ],
					dangerouslySetInnerHTML: { __html: highlightedCode },
				} as unknown as Properties & { dangerouslySetInnerHTML: { __html: string } };
			} catch (error) {
				console.warn('Highlight.js failed:', error);
			}
		});
	};
}
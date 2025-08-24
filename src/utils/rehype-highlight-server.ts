import { visit } from 'unist-util-visit';
import hljs from 'highlight.js';

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
              const result = hljs.highlightAuto(code);
              highlightedCode = result.value;
            }
            
                        codeNode.children = [{ 
              type: 'raw', 
              value: highlightedCode 
            }];
            
                        codeNode.properties = {
              ...codeNode.properties,
              className: ['hljs', `language-${language}`]
            };
          } catch (error) {
            console.warn('Highlight.js failed:', error);
                      }
        }
      }
    });
  };
}
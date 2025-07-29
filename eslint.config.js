import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			// Semicolons
			semi: ['error', 'always'],
			
			// Indentation - use tabs
			indent: ['error', 'tab'],
			
			// Quotes - single quotes preferred
			quotes: ['error', 'single', { avoidEscape: true }],
			
			// Trailing commas
			'comma-dangle': ['error', 'always-multiline'],
			
			// Object spacing
			'object-curly-spacing': ['error', 'always'],
			
			// Array spacing
			'array-bracket-spacing': ['error', 'never'],
			
			// Function spacing
			'space-before-function-paren': ['error', {
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}],
			
			// Arrow function spacing
			'arrow-spacing': ['error', { before: true, after: true }],
			
			// Block spacing
			'block-spacing': ['error', 'always'],
			
			// Brace style
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			
			// Comma spacing
			'comma-spacing': ['error', { before: false, after: true }],
			
			// Key spacing
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			
			// Keyword spacing
			'keyword-spacing': ['error', { before: true, after: true }],
			
			// Line breaks
			'eol-last': ['error', 'always'],
			
			// No trailing spaces
			'no-trailing-spaces': 'error',
			
			// No multiple empty lines
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
		},
	},
]);

import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';

export default [
	{
		ignores: [ 'dist/**', 'node_modules/**', '.vike/**', 'libs/**', 'public/**' ],
	},
	{
		files: [ '**/*.{js,jsx,ts,tsx}' ],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@stylistic': stylistic,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			'no-debugger': 'warn',

			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'react/jsx-key': 'error',
			'react/no-unknown-property': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
				},
			],
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports' },
			],

			'no-unused-vars': 'off',

			semi: [ 'error', 'always' ],
			quotes: [ 'warn', 'single', { avoidEscape: true } ],
			'@stylistic/indent': [ 'warn', 'tab' ],
			'@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
			'@stylistic/object-curly-spacing': [ 'error', 'always' ],
			'@stylistic/array-bracket-spacing': [ 'error', 'always' ],
			'@stylistic/max-len': 'off',
		},
	},
];
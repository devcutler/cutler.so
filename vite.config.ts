import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vike from 'vike/plugin';
import path from 'path';

export default defineConfig({
	plugins: [ vike(), react(), tailwindcss() ],
	publicDir: 'public',
	build: {
		target: 'es2022',
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						if (id.includes('remark') ||
                id.includes('rehype') ||
                id.includes('highlight.js') ||
                id.includes('unist-util-visit') ||
                id.includes('gray-matter')) {
							return 'markdown-vendor';
						}
						if (id.includes('react') || id.includes('react-dom')) {
							return 'react-vendor';
						}
						if (id.includes('lucide-react')) {
							return 'lucide';
						}
						if (id.includes('vike-react')) {
							return 'vike-vendor';
						}
						return 'vendor';
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@libs': path.resolve(__dirname, './libs'),
		},
	},
});

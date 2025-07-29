import { useState, useEffect } from 'react';
import type { ContentIndex, ContentItem } from '../types/content';

interface UseContentState {
  index: ContentIndex | null;
  loading: boolean;
  error: string | null;
}

interface ContentCache {
  [slug: string]: ContentItem;
}

const contentCache: ContentCache = {};

export function useContent() {
	const [state, setState] = useState<UseContentState>({
		index: null,
		loading: true,
		error: null
	});

	useEffect(() => {
		async function loadContentIndex() {
			try {
				setState(prev => ({ ...prev, loading: true, error: null }));

				try {
					const data = await import('../data/content-index.json');
					setState({
						index: data.default,
						loading: false,
						error: null
					});
					return;
				} catch {
					const response = await fetch('/content-index.json');
					if (!response.ok) {
						throw new Error(`Failed to load content index: ${response.status} ${response.statusText}`);
					}
					const data = await response.json();
					setState({
						index: data,
						loading: false,
						error: null
					});
				}
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
				console.error('Error loading content index:', errorMessage);
				setState({
					index: null,
					loading: false,
					error: errorMessage
				});
			}
		}

		loadContentIndex();
	}, []);

	const getContentBySlug = async (slug: string): Promise<ContentItem | null> => {
		if (!state.index) return null;

		const normalizedSlug = slug === '' ? '/' : slug;

		if (contentCache[normalizedSlug]) {
			return contentCache[normalizedSlug];
		}

		const indexItem = [...state.index.pages, ...state.index.blog]
			.find(item => item.slug === normalizedSlug);

		if (!indexItem) return null;

		try {
			const filename = normalizedSlug.replace(/\//g, '_').replace(/^_/, '') + '.json';
			const response = await fetch(`/content/${filename}`);

			if (!response.ok) {
				throw new Error(`Failed to load content: ${response.status}`);
			}

			const contentItem = await response.json();

			contentCache[normalizedSlug] = contentItem;

			return contentItem;
		} catch (error) {
			console.error('Error loading individual content:', error);
			return null;
		}
	};

	return {
		index: state.index,
		loading: state.loading,
		error: state.error,
		getContentBySlug,
		pages: state.index?.pages || [],
		blog: state.index?.blog || []
	};
}
import { useCallback } from 'react';

export function useUmami(): { track: (eventName: string, data?: Record<string, unknown>) => void } {
	const track = useCallback((eventName: string, data?: Record<string, unknown>): void => {
		if (typeof window !== 'undefined' && window.umami) {
			window.umami.track(eventName, data);
		}
	}, []);

	return { track };
}
import { useCallback } from 'react';

export function useUmami() {
  const track = useCallback((eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(eventName, data);
    }
  }, []);

  return { track };
}
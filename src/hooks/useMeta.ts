import { useEffect } from 'react';

interface MetaProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function useMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl
}: MetaProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const updateMetaTag = (property: string, content: string) => {
      if (!property || !content || typeof property !== 'string' || typeof content !== 'string') {
        console.warn('Invalid meta tag parameters:', { property, content });
        return;
      }

      const sanitizedProperty = property.replace(/[<>\"']/g, '').trim();
      const sanitizedContent = content.replace(/[<>\"']/g, '').trim();

      if (!sanitizedProperty || !sanitizedContent) {
        console.warn('Meta tag parameters became empty after sanitization');
        return;
      }

      const validPropertyPattern = /^[a-z:_-]+$/i;
      if (!validPropertyPattern.test(sanitizedProperty)) {
        console.warn('Invalid meta property format:', sanitizedProperty);
        return;
      }

      let meta = document.querySelector(`meta[property="${sanitizedProperty}"]`) ||
        document.querySelector(`meta[name="${sanitizedProperty}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        if (sanitizedProperty.startsWith('og:')) {
          meta.setAttribute('property', sanitizedProperty);
        } else {
          meta.setAttribute('name', sanitizedProperty);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', sanitizedContent);
    };

    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', ogDescription || description);
    }

    if (title) {
      updateMetaTag('og:title', ogTitle || title);
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('og:url', ogUrl);
    }

    updateMetaTag('og:type', 'website');

  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl]);
}
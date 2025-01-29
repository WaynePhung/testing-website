'use client';

import { useRef, useEffect } from 'react';

export function useHeaderFooterRefs() {
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    headerRef.current = document.querySelector('header');
    footerRef.current = document.querySelector('footer');

    // console.log('Header structure:', headerRef.current);
    // console.log('Footer structure:', footerRef.current);

    if (headerRef.current) {
      // console.log('Header children:', headerRef.current.children);
    }

    if (footerRef.current) {
      // console.log('Footer children:', footerRef.current.children);
    }
  }, []);

  return { headerRef, footerRef };
}
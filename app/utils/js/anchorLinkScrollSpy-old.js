import { useCallback } from 'react';
import { useRouter } from 'next/router';

export function useScrollHandler() {
  const router = useRouter();

  const handleScroll = useCallback((e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const h2 = element.querySelector('h2');
      const offset = (header?.offsetHeight || 0) + (h2?.offsetHeight || 0) + (footer?.offsetHeight || 0);
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      router.push(href, undefined, { shallow: true });
    }
  }, [router]);

  return handleScroll;
}

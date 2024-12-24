// useScrollSpyNav.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export function useScrollSpyNav(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `${-offset}px 0px 0px 0px` }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const h2 = element.querySelector('h2');
      const top = element.getBoundingClientRect().top + window.scrollY - offset - (h2?.offsetHeight || 0);
      window.scrollTo({ top, behavior: 'smooth' });
      router.push(href, undefined, { shallow: true });
    }
  }, [offset, router]);

  return { activeId, handleAnchorClick };
}
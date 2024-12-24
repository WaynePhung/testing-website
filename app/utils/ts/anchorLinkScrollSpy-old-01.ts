import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useScrollToSection() {
  const 
    router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      scrollToElement(id);
    }
  }, [pathname, searchParams]);

  const scrollToSection = (href: string) => {
    const [path, hash] = href.split('#');
    const header = document.querySelector('header') as HTMLElement;
    const headerHeight = header.offsetHeight;
    if (path && path == pathname) {
      if (hash == "top-of-page" && (window.scrollY == headerHeight || window.scrollY == 0)) {
        // Do nothing.
      } else {
        scrollToElement(hash);
      }
    } else if (path && path !== pathname) {
      // If the target is on a different page, use window.location
      router.push(href);
      scrollToElement(hash);
      // setTimeout(() => router.push(href), 100);
      // setTimeout(() => scrollToElement(hash), 500);
    } else {
      // If on the same page, just scroll
      if (hash == "top-of-page" && (window.scrollY == headerHeight || window.scrollY == 0)) {
        // Do nothing.
      } else {
        scrollToElement(hash);
      }
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // console.log('Scroll position: ' + window.scrollY);
      // console.log('Targeted ID: ' + id);
      const 
        header = document.querySelector('header') as HTMLElement,
        headerHeight = header.offsetHeight, 
        elementPosition = element.getBoundingClientRect().top + window.scrollY,
        top = (window.innerWidth <= 1024) ? elementPosition + 15 : elementPosition - headerHeight + 10;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  };

  return scrollToSection;
}
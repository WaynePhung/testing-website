"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Define the type for the SearchParamsWrapper component props
type SearchParamsWrapperProps = {
  children: (searchParams: ReturnType<typeof useSearchParams>) => void;
};

export function useScrollToSection() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchParamsState, setSearchParamsState] = useState<ReturnType<typeof useSearchParams> | null>(null);

  // Wrapper component to handle useSearchParams
  const SearchParamsWrapper = useCallback(({ children }: SearchParamsWrapperProps) => {
    const searchParams = useSearchParams();
    useEffect(() => {
      children(searchParams);
      setSearchParamsState(searchParams);
    }, [searchParams, children]);
    return null;
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      scrollToElement(id);
    }
  }, [pathname, searchParamsState]);

  const scrollToElement = (id: string) => {
    console.log('scroll to element: ' + id);
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header') as HTMLElement;
      const headerHeight = header.offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const top = (window.innerWidth < 1024) ? elementPosition + 10 : elementPosition - headerHeight + 10;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (href: string) => {
    const [path, hash] = href.split('#');
    const header = document.querySelector('header') as HTMLElement;
    const headerHeight = header.offsetHeight;
    if (path && path === pathname) {
      if (hash === "top-of-page" && (window.scrollY === headerHeight || window.scrollY === 0)) {
        // Do nothing.
      } else {
        scrollToElement(hash);
      }
    } else if (path && path !== pathname) {
      // If the target is on a different page, use router.push
      router.push(href);
      scrollToElement(hash);
    } else {
      // If on the same page, just scroll
      if (hash === "top-of-page" && (window.scrollY === headerHeight || window.scrollY === 0)) {
        // Do nothing.
      } else {
        scrollToElement(hash);
      }
    }
  };

  return {
    scrollToSection,
    SearchParamsWrapper
  };
}
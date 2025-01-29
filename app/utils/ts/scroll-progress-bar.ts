// useProgressBar.ts
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function scrollProgressBar(caseStudyPaths: string[]) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 320) {
      return;
    }

    const updateProgress = () => {
      const 
        scrollPosition = window.scrollY,
        windowHeight = window.innerHeight,
        documentHeight = document.documentElement.scrollHeight;

      let totalHeight = 0,
          currentProgress;

      // if (pathname === '/') {
      //   totalHeight = documentHeight - windowHeight;
      //   currentProgress = (scrollPosition / totalHeight) * 100;
      // } else if (caseStudyPaths.some(path => pathname?.includes(path))) {
      if (caseStudyPaths.some(path => pathname?.includes(path))) {
        const otherCaseStudies = document.querySelector('#other-case-studies');
        if (otherCaseStudies) {
          const otherCaseStudiesPosition = otherCaseStudies.getBoundingClientRect().top + scrollPosition;
          totalHeight = otherCaseStudiesPosition - windowHeight;
          currentProgress = (scrollPosition / totalHeight) * 100;
        }
      } else {
        totalHeight = documentHeight - windowHeight;
        currentProgress = (scrollPosition / totalHeight) * 100;
      }
      if (!currentProgress) {
        // console.log('currentProgress number is undefined and will default to zero as the width value. Progress bar will not show any width.');
        currentProgress = 0;
      } else {
        // Do nothing.
      }
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call to set progress on mount

    return () => window.removeEventListener('scroll', updateProgress);
  }, [pathname, caseStudyPaths]);

  return progress;
}

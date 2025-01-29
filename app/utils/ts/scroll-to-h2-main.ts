// utils/handleStickyHeaders.ts
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";
import { setActiveLink } from "./active-link-styling";
// import { usePathname } from 'next/navigation';

// const pathname = window.location.pathname;

function isRootUrl(): boolean {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.location) {
      const rootRegex = /^\/(?:index(?:\.html?)?)?$/i;
      return rootRegex.test(window.location.pathname);
  }
  // Return false if we're not in a browser environment
  return false;
}
// We define a function isRootUrl() that returns a boolean.
// Inside the function, we create a regular expression rootRegex:
//     ^\/ matches the start of the string and a forward slash.
//     (?:index(?:\.html?)?)? is a non-capturing group that optionally matches "index", followed by an optional ".html" or ".htm".
//     $ ensures the pattern matches to the end of the string.
//     The i flag makes the regex case-insensitive.
// We use rootRegex.test(location.pathname) to check if the current path matches our root URL pattern.


export const handleStickyHeaders = (contentRef: React.RefObject<HTMLElement>, pathname: string) => {
    const 
      header = document.querySelector('header'),
      headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
      // pathname = usePathname();
    let sections;
    if (contentRef.current) {
      if (pathname === '/') {
        // console.log('Root url.');
          sections = contentRef.current.querySelectorAll('section');
      } else if (caseStudyPaths.some(path => pathname.startsWith(path))) {
        // console.log('Not root url.');
          sections = contentRef.current.querySelectorAll('section.content > article');
      }
    }
    if (sections) {
      sections.forEach((section) => {
        const h2 = section.querySelector('h2');
        let h2Wrapper = section.querySelector('.h2-wrapper');
    
        if (h2 && !h2Wrapper && h2.parentNode) {
          h2Wrapper = document.createElement('article');
          h2Wrapper.className = 'h2-wrapper';
          h2.parentNode.insertBefore(h2Wrapper, h2);
          h2Wrapper.appendChild(h2);
        }
    
        const rect = section.getBoundingClientRect();
        if (h2Wrapper instanceof HTMLElement && h2) {
          let topBound, bottomBound;
          if (window.innerWidth < 1024) {
            topBound = 0;
            bottomBound = h2Wrapper.offsetHeight;
          } else {
            topBound = headerHeight;
            bottomBound = h2Wrapper.offsetHeight + headerHeight;
          }
          if (rect.top <= topBound && rect.bottom >= bottomBound) {
            
            // h2Wrapper.style.position = '';
            h2Wrapper.style.position = 'sticky';
            h2Wrapper.style.width = '100%';
            
            h2.classList.add('sticky');
            let h2Parent = h2Wrapper.parentElement;
            let h2WrapperParent = h2Wrapper.parentElement;
            if (h2Parent && h2Parent.getAttribute('id')) {
              const getSectionName = h2Parent.id.split('#')[0];
              // console.log('Section name: ' + getSectionName);
              // setActiveLink(getSectionName, pathname);
            }
            if (h2WrapperParent && h2WrapperParent.getAttribute('id')) {
              const getSectionName = h2WrapperParent.id.split('#')[0];
              // console.log('Section name: ' + getSectionName);
              // setActiveLink(getSectionName, pathname);
            }
            if (window.innerWidth <= 1024) {
              h2.style.top = '0';
              h2.style.width = `${parseInt(window.getComputedStyle(h2Wrapper).width, 10)}px`;
              h2Wrapper.style.height = `${h2.offsetHeight}px`;
            } else {
              let getBodyContentSection = document.querySelector('section.bodyContent');
              h2.style.top = `${headerHeight}px`;
              h2.style.width = `calc(${parseInt(window.getComputedStyle(h2Wrapper).width, 10)}px - ${parseInt(window.getComputedStyle(h2).paddingRight, 10)}px + ${getBodyContentSection ? parseInt(window.getComputedStyle(getBodyContentSection).columnGap, 10) : 0}px)`;
              // // An explicit height value instead of a dynamically calculated value is needed to prevent content shifting and scrolling issues. 80px was chosen because it adds up the height of the h2 (64px) with the h2's bottom padding (16px), so 64px + 16px = 80px.
              h2Wrapper.style.height = `80px`;
            }

            // const h2Height = h2.offsetHeight;
            // const h2TopPadding = parseInt(window.getComputedStyle(h2).paddingTop, 10);
            // const h2BottomPadding = parseInt(window.getComputedStyle(h2).paddingBottom, 10);
            // const totalH2Height = h2Height - h2TopPadding - h2BottomPadding;
            // console.log('h2 height: ' + h2Height + ' h2 bottom padding: ' + h2BottomPadding + ' total h2 height: ' + totalH2Height );
            // h2Wrapper.style.height = `${h2.offsetHeight}px`;
            // h2Wrapper.style.height = `${totalH2Height}px`;
          } else {
            // Remove the wrapper and place the h2 back in its original position
            if (h2Wrapper.parentNode) {
              h2Wrapper.parentNode.insertBefore(h2, h2Wrapper);
              h2Wrapper.parentNode.removeChild(h2Wrapper);
            }
            h2.style.position = '';
            h2.style.top = '';
            h2.style.width = '';
            h2.classList.remove('sticky');
          }
        }
      });
    } else {
      //Do nothing.
    }
    
  };
  
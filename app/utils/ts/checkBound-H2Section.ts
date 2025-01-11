import { isWithinBodyContentBounds } from "./checkBound-BodyContent";
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";
import { setActiveLink } from "./active-link-styling";
import path from "path";
import { useRouter } from 'next/router';

interface SectionInfo {
  isWithinBounds: boolean;
  section: Element;
  h2: HTMLHeadingElement | null;
  h2Wrapper: HTMLElement | null;
}

let sectionInfoArray: SectionInfo[] = [];

// function getSections(pathname: string): NodeListOf<Element> | null {
//   const main = document.querySelector('main');
//   if (!main) return null;

//   if (pathname === '/') {
//     return main.querySelectorAll('section:not(section.title)');
//   } else if (caseStudyPaths.includes(pathname)) {
//     return main.querySelectorAll('section.content > article');
//   }
//   return null;
// }


export function initializeH2SectionBounds(pathname: string): void {
  'use strict';

  // console.log('pathname in initializeH2SectionBounds: ' + pathname);
  let main = document.querySelector('main');

  if (!main) {
    console.log('Main container does not exist. Function initializeH2SectionBounds does nothing.');
    return;
  }

  let sections: NodeListOf<Element>;
  // console.log('initializeH2SectionBounds - pathname: ' + pathname);
  if (pathname === '/') {
    sections = main.querySelectorAll('section:not(section.title)');
    console.log('Getting sections from main page.');
  } else if (caseStudyPaths.includes(pathname)) {
    sections = main.querySelectorAll('section.content-loc > article');
    console.log('Getting sections from case study page.');
  } else {
    sections = main.querySelectorAll('section.bodyContent > article');
    console.log('Section container does not exist. Default is error page.');
    // return;
  }

  sectionInfoArray = [];

  sections.forEach((section: Element) => {
    const h2 = section.querySelector('h2');
    let h2Wrapper = section.querySelector('.h2-wrapper');

    if (h2 && !h2Wrapper && h2.parentNode) {
      h2Wrapper = document.createElement('article') as HTMLElement;
      h2Wrapper.className = 'h2-wrapper';
      h2.parentNode.insertBefore(h2Wrapper, h2);
      h2Wrapper.appendChild(h2);
    }

    if (!(section instanceof Element)) {
      console.warn('Section is not an instance of Element or does not exist.');
    } else if (!(h2 instanceof HTMLHeadingElement)) {
      console.warn('H2 is not an instance of HTMLHeadingElement or does not exist.');
    } else if (h2Wrapper !== null && !(h2Wrapper instanceof HTMLElement)) {
      console.warn('H2Wrapper is not an instance of HTMLElement (but is not null).');
    } else {
      sectionInfoArray.push({
        isWithinBounds: false,
        section,
        h2,
        h2Wrapper
      });
    }      
  });

  // Update isWithinBounds using updateH2SectionBounds
  sectionInfoArray = updateH2SectionBounds(pathname);

  // console.log('Initialized sectionInfoArray: ', sectionInfoArray);

  sectionInfoArray.forEach((item, index) => {
    console.log(`Item ${index}:`);
    console.log('  isWithinBounds:', item.isWithinBounds);
    console.log('  section:', item.section);
    console.log('  h2:', item.h2);
    console.log('  h2Wrapper:', item.h2Wrapper);
  });
}
  
export function updateH2SectionBounds(pathname: string): SectionInfo[] {
  const scrollPosition = window.scrollY;
  const header = document.querySelector('header');
  let headerHeight = 0;

  if (header) {
    headerHeight = header.offsetHeight;
  }

  return sectionInfoArray.map(sectionInfo => {
    const h2SectionRect = sectionInfo.section.getBoundingClientRect();
    const bcRectTopBound = window.innerWidth < 1024 ? (h2SectionRect.top + window.scrollY - 10) : (h2SectionRect.top + window.scrollY - (1*headerHeight) - 10);
    const bcRectBottomBound = window.innerWidth < 1024 ? (h2SectionRect.bottom + window.scrollY - 10) : (h2SectionRect.bottom + window.scrollY - (1*headerHeight) - 200);
    console.log('bcRectTopBound: ' + bcRectTopBound);
    console.log('bcRectBottomBound: ' + bcRectBottomBound);
    return {
      ...sectionInfo,
      isWithinBounds: (scrollPosition >= bcRectTopBound) && (scrollPosition <= bcRectBottomBound)
    };
  });
}

export function handleScrollAndResize(pathname: string): void {
  updateH2SectionBounds(pathname);

  for (let i = 0; i < sectionInfoArray.length; i++) {
    const info = sectionInfoArray[i];
    if (!info.h2 || !info.h2Wrapper) return;

    const parent = info.h2Wrapper.parentElement;
    if (parent?.id) {
      const sectionName = parent.id.split('#')[0];
      // if (!isWithinBodyContentBounds(pathname)) {
      //   removeStickyStyling(info.h2, info.h2Wrapper);
      //   setActiveLink(sectionName, pathname, false);
      // } else {
        if (info.isWithinBounds) {
          console.log('H2 ' + info.h2 + ' is within its parent section bounds.');
          applyStickyStyling(info.h2, info.h2Wrapper);
          setActiveLink(sectionName, pathname, true);
        } else {
          console.log('H2 ' + info.h2 + ' is not within its parent section bounds.');
          removeStickyStyling(info.h2, info.h2Wrapper);
          setActiveLink(sectionName, pathname, false);
        }
      // }
    }
  }
  // sectionInfoArray.forEach(info => {
  //   if (!info.h2 || !info.h2Wrapper) return;

  //   const parent = info.h2Wrapper.parentElement;
  //   if (parent?.id) {
  //     const sectionName = parent.id.split('#')[0];
  //     // if (isWithinBodyContentBounds(pathname)) {
  //         if (info.isWithinBounds) {
  //           console.log('H2 ' + info.h2 + ' is within its parent section bounds.');
  //           applyStickyStyling(info.h2, info.h2Wrapper);
  //           setActiveLink(sectionName, pathname, true);
  //         } else {
  //           console.log('H2 ' + info.h2 + ' is not within its parent section bounds.');
  //           removeStickyStyling(info.h2, info.h2Wrapper);
  //           // setActiveLink(sectionName, pathname, false);
  //         }
  //     // } else {
  //     //   console.log('H2 ' + info.h2 + ' is not within body bounds.');
  //     //     removeStickyStyling(info.h2, info.h2Wrapper);
  //     //     setActiveLink(sectionName, pathname, false);
  //     // }
  //   }
  // });
}

function applyStickyStyling(h2: HTMLHeadingElement, h2Wrapper: HTMLElement) {
  h2.classList.add('sticky');
  h2Wrapper.style.position = 'sticky';
  h2Wrapper.style.width = '100%';
  h2Wrapper.style.height = '80px';

  if (window.innerWidth <= 1024) {
    h2.style.top = '0';
    h2.style.width = `${parseInt(window.getComputedStyle(h2Wrapper).width, 10)}px`;
  } else {
    const header = document.querySelector('header');
    const bodyContentSection = document.querySelector('section.bodyContent');
    if (header) {
      h2.style.top = `${header.offsetHeight}px`;
      const h2WrapperWidth = parseInt(window.getComputedStyle(h2Wrapper).width, 10);
      const h2PaddingLeft = parseInt(window.getComputedStyle(h2).paddingLeft, 10);
      const h2PaddingRight = parseInt(window.getComputedStyle(h2).paddingRight, 10);
      const columnGap = bodyContentSection ? parseInt(window.getComputedStyle(bodyContentSection).columnGap, 10) : 0;
      // h2.style.width = `calc(${h2WrapperWidth}px - ${h2PaddingLeft}px + ${columnGap}px)`;
      h2.style.width = `calc(${h2WrapperWidth}px + ${columnGap}px)`;
    }
  }
}

function removeStickyStyling(h2: HTMLHeadingElement, h2Wrapper: HTMLElement) {
  if (h2Wrapper.parentNode) {
    h2Wrapper.parentNode.insertBefore(h2, h2Wrapper);
    h2Wrapper.parentNode.removeChild(h2Wrapper);
  }
  h2.style.position = '';
  h2.style.top = '';
  h2.style.width = '';
  h2.classList.remove('sticky');
}

export function setupStickyH2(pathname: string) {
    initializeH2SectionBounds(pathname);
    updateH2SectionBounds(pathname);
    handleScrollAndResize(pathname);
  
    const debouncedHandler = debounce(() => handleScrollAndResize(pathname), 200);
  
    window.addEventListener('scroll', debouncedHandler);
    window.addEventListener('resize', debouncedHandler);
    
    // Remove the beforeunload event listener
    // window.addEventListener('beforeunload', debouncedHandler);
    
    // Remove these event listeners as they're not needed in Next.js
    // window.addEventListener('popstate', handleRouteChange);
    // window.addEventListener('pushstate', handleRouteChange);
    // window.addEventListener('replacestate', handleRouteChange);
}

// function handleRouteChange() {
//     const newPathname = window.location.pathname;
//     initializeH2SectionBounds(newPathname);
//     updateH2SectionBounds(newPathname);
//     handleScrollAndResize(newPathname);
//     setActiveLink(newPathname, newPathname, isWithinBodyContentBounds(newPathname));
// }

function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Call this function when the route changes
export function onRouteChange(newPathname: string) {
    initializeH2SectionBounds(newPathname);
    updateH2SectionBounds(newPathname);
    handleScrollAndResize(newPathname);
    setActiveLink(newPathname, newPathname, isWithinBodyContentBounds(newPathname));
}
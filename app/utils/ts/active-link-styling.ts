import { isWithinBodyContentBounds } from "./checkBound-BodyContent";
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";

export function setActiveLink(currentHref: string, pathname: string, withinBounds: boolean): void {
  'use strict';

  // console.log('pathname in setActiveLink: ' + pathname);
  let navElement: Element | null = null;
  const activeClass = 'active';

  // Function to remove active class from all links in a given nav element
  const removeActiveFromAll = (nav: Element | null) => {
    if (nav) {
      const links = nav.querySelectorAll('a');
      links.forEach(link => link.classList.remove(activeClass));
    }
  };

  // Remove active class from all potential nav elements
  const homeNav = document.querySelector('nav.anchorLinks');
  const mobileNav = document.querySelector('nav.locNavLinks');
  const desktopAside = document.querySelector('aside');

  removeActiveFromAll(homeNav);
  removeActiveFromAll(mobileNav);
  removeActiveFromAll(desktopAside);

  // Determine the correct nav element based on the current pathname
  if (pathname === '/') {
    navElement = homeNav;
  } else if (caseStudyPaths.includes(pathname)) {
    navElement = window.innerWidth < 1024 ? mobileNav : desktopAside;
  }

  if (!navElement) return;

  const links = navElement.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      let hrefWithoutHash = (href.split('#')[1] || href.split('#')[0] || href).split('?')[0];

    if (hrefWithoutHash === '') {
      hrefWithoutHash = pathname.split('#')[1];
    }
      //  = pathname === '/'
      //   ? (href.split('#')[1] || href.split('#')[0]).split('?')[0]
      //   : href.split('#')[0].split('?')[0];

      const currentPathWithoutHash = currentHref.split('#')[0].split('?')[0];

      // console.log('hrefWithoutHash: ' + hrefWithoutHash + ' currentPathWithoutHash: ' + currentPathWithoutHash);

      if (hrefWithoutHash === currentPathWithoutHash) {
        if (withinBounds) {
        // if (isWithinBodyContentBounds(pathname) && withinBounds) {
          link.classList.add(activeClass);
        } else {
          link.classList.remove(activeClass);
          return;
        }
      }
    }
  });

  // if (!isWithinBodyContentBounds(pathname)) {
    // links.forEach(link => link.classList.remove(activeClass));
  // }
}

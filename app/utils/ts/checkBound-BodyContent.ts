'use strict';

import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";

export function isWithinBodyContentBounds(pathname: string) {
    let boundaryElements: Element[] = [];
    const header = document.querySelector('header');
    let headerHeight = header ? header.offsetHeight : 0;

    if (pathname === '/') {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            boundaryElements = Array.from(mainElement.querySelectorAll('section:not(#home-title)'));
        }
    } else if (caseStudyPaths.includes(pathname)) {
        // const bodyContent = document.querySelector('main');
        const bodyContent = document.querySelector('section.content');
        if (bodyContent) {
            // boundaryElements = Array.from(bodyContent.querySelectorAll('section.content'));
            boundaryElements = [bodyContent];
        }
    } else {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            boundaryElements = [mainElement];
        }
    }

    if (boundaryElements.length === 0) {
        // console.log('No boundary elements found. Function isWithinBodyContentBound does nothing.');
        return false;
    } else {
        const scrollPosition = window.scrollY;
        let topBound = Infinity;
        let bottomBound = -Infinity;
        boundaryElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (window.innerWidth < 1024) {
                topBound = Math.min(topBound, rect.top + window.scrollY - 10);
                bottomBound = Math.max(bottomBound, rect.bottom + window.scrollY - 10);
            } else {
                topBound = Math.min(topBound, rect.top + window.scrollY - headerHeight - 20);
                bottomBound = Math.max(bottomBound, rect.bottom + window.scrollY - headerHeight - 20);
            }
        });

        const isWithinBoundsBodyContent = (scrollPosition >= topBound) && (scrollPosition <= bottomBound);
        return isWithinBoundsBodyContent;
    }
}
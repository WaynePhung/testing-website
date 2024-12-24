import { get } from "http";

export var 
    main = document.querySelector('main'),
    titleSection = document.getElementById('title'),
    h2Headings = document.querySelectorAll('main h2'),
    headerHeight = document.querySelector('header').offsetHeight;
    // stickyH2Index = 0;

export function changeStickyH2() {
    let scrollPosition = window.scrollY,
        mainBounds = main.getBoundingClientRect(),
        mainTopBoundary = main.offsetTop + titleSection.offsetHeight,
        mainBottomBoundary = main.offsetTop + main.offsetHeight;
    // console.log('scrollPosition: ' + scrollPosition);
    // console.log('main bound top: ' + mainBounds.top);
    // console.log('title section height: ' + titleSection.offsetHeight);
    // console.log('main bound bottom: ' + mainBounds.bottom);
    // console.log('mainTopBoundary: ' + mainTopBoundary);
    // console.log('mainBottomBoundary: ' + mainBottomBoundary);
    if ((scrollPosition > mainTopBoundary) && (scrollPosition < mainBottomBoundary)) {
        for (let i = 0; i < h2Headings.length; i++) {
            let parentSection = h2Headings[i].closest('section'),
                sectionTop = parentSection.offsetTop,
                sectionBottom = parentSection.offsetTop + parentSection.offsetHeight - 100;
            // console.log('index: ' + i);
            // console.log('sectionTop: ' + sectionTop);
            // console.log('sectionBottom: ' + sectionBottom);
            // console.log('scrollPosition: ' + scrollPosition);
            // console.log('sectionTop: ' + sectionTop);
            // console.log('sectionBottom: ' + sectionBottom);
            // unstickH2(h2Headings[i]);
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                console.log('Add sticky.');
                stickH2(h2Headings[i]);
                continue;
            // } else if ((scrollPosition < sectionTop) || (scrollPosition > sectionBottom)) {
            } else {
                console.log('Remove sticky.');
                unstickH2(h2Headings[i]);
                continue;
            }
        }
    } else {
        console.log('Remove sticky from all h2 headings.');
        for (let i = 0; i < h2Headings.length; i++) {
            unstickH2(h2Headings[i]);
        };
    }
}

export function stickH2(selectedh2) {
    selectedh2.classList.add('sticky');
    if (window.innerWidth < 1024) {
        selectedh2.style.top = "0px";
    } else {
        selectedh2.style.top = `${headerHeight}px`;
    }
    if (selectedh2.parentElement.matches('.h2-wrapper')) {
        // Do nothing.
    } else {
        const newWrapper = document.createElement('article');
        newWrapper.className = 'h2-wrapper';
        selectedh2.parentNode.insertBefore(newWrapper, selectedh2);
        newWrapper.appendChild(selectedh2);
        newWrapper.style.width = "100%";
        newWrapper.style.height = `${newWrapper.querySelector('h2').offsetHeight}px`;
    }
}

export function unstickH2(selectedh2) {
    selectedh2.classList.remove('h2-sticky', 'sticky');
    selectedh2.style.top = '';
    
    if (selectedh2.closest('.h2-wrapper')) {
        let h2Wrapper = selectedh2.closest('.h2-wrapper');
        h2Wrapper.parentNode.replaceChild(selectedh2, h2Wrapper);
    } else {
        // Do nothing.
    }
}

// export function findH2Wrapper(selectedh2, selector) {
//     if (selectedh2.parentElement.matches(selector)) {
//         selectedh2 = selectedh2.closest(selector);
//         return selectedh2.closest(selector);
//     }
//     return null;
// }
// Run the function on load and resize

// window.addEventListener ('DOMContentLoaded', adjustFooterBottomPadding);
// window.addEventListener ('load', adjustFooterBottomPadding);
// window.addEventListener ('resize', adjustFooterBottomPadding);

// import exp from "constants";
// import React from "react";

// export var 
//     footer = document.querySelector('footer'), 
//     header = document.querySelector('header');
    // footerInitialStyle = window.getComputedStyle(footer),
    // getFooterBottomMargin = footerInitialStyle.getPropertyValue('margin-bottom');

// window.addEventListener ('load', function() {
//     // console.log("screen width: " + window.innerWidth);
//     if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
//         adjustFooterBottomPadding();
//     } else {
//         // console.log('Resetting footer bottom margin.');
//         footer.style.marginBottom = '';
//     } 
// });

// window.addEventListener('resize', function() {
//     // console.log('Screen width: ' + window.innerWidth);
//     if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
//         adjustFooterBottomPadding();
//     } else {
//         // console.log('Resetting footer bottom margin.');
//         footer.style.marginBottom = '';
//     }
// });

import { useEffect, useRef } from 'react';

export default function adjustFooterBottomPadding() {
    const footerRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        const header = headerRef.current;
    
        if (footer && header) {
          const adjustPadding = () => {
            if (window.innerWidth <= 1024) {
              footer.style.paddingBottom = '';
              header.style.height = 'auto';
    
              const getFooterBottomPadding = parseFloat(window.getComputedStyle(footer).getPropertyValue('padding-bottom'));
              const headerHeight = header.offsetHeight;
    
              footer.style.paddingBottom = headerHeight + getFooterBottomPadding + "px";
            } else {
              footer.style.paddingBottom = '';
            }
          };
    
          adjustPadding();
          window.addEventListener('resize', adjustPadding);
    
          return () => window.removeEventListener('resize', adjustPadding);
        }
    
    }, []);
    
    return { footerRef, headerRef };
}
    
// Run the function on load and resize

// window.addEventListener ('DOMContentLoaded', adjustFooterBottomPadding);
// window.addEventListener ('load', adjustFooterBottomPadding);
// window.addEventListener ('resize', adjustFooterBottomPadding);

import exp from "constants";
import React from "react";

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

export function adjustFooterBottomPadding() {
    let footer = document.querySelector('footer'), 
        header = document.querySelector('header');
    if (footer && header) {
        if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
    
            // Get the footer and header.
            
            // Reset footer margin and header height
            footer.style.paddingBottom = '';
            header.style.height = 'auto';
    
            // Then get the computed bottom padding of the footer and header height.
            let getFooterBottomPadding = parseFloat(window.getComputedStyle(footer).getPropertyValue('padding-bottom')),
            headerHeight = document.querySelector('header').offsetHeight;
            // console.log('Footer initial bottom padding: ' + getFooterBottomPadding);
    
            // Add header height value to computed footer padding.
            footer.style.paddingBottom = headerHeight + getFooterBottomPadding + "px";
        } else {
            // Reset footer padding. This is to prevent excess padding bottom space occurring when the window inner width is below 320px or above 1024px.
            footer.style.paddingBottom = '';
        }
    } else {
        
    }
    return null;
}

export default adjustFooterBottomPadding;
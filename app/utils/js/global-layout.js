"use strict";

import * as aFBM from "./footer.js";
import * as cSH2 from "./scroll-to-h2-main.js";

// export default function javascript() {
//     aFBM.adjustFooterBottomPadding();
//     cSH2.changeStickyH2();
// }

// import "./video-sizing.js";

var timeOutResize,
    timeOutChangeStickyH2;
function javascript() {
    // if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
    //     aFBM.adjustFooterBottomPadding();
    // } else {
    //     // console.log('Resetting footer bottom margin.');
    //     aFBM.footer.style.marginBottom = '';
    // }
    // cSH2.changeStickyH2();
    window.addEventListener ('DOMContentLoaded', function() {
        // console.log("screen width: " + window.innerWidth);
        // if (timeOutResize) {
        //     clearTimeout(timeOutResize);
        // }
        // if (window.innerWidth >= 320) {
        //     timeOutChangeStickyH2 = 0;
        // } else {
        //     timeOutChangeStickyH2 = 0;
        // }
        if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
            aFBM.adjustFooterBottomPadding();
        } else {
            // console.log('Resetting footer bottom margin.');
            aFBM.footer.style.marginBottom = '';
        }
        cSH2.changeStickyH2();
    });
    
    window.addEventListener ('resize', function() {
        // console.log("screen width: " + window.innerWidth);
        // if (timeOutResize) {
        //     clearTimeout(timeOutResize);
        // }
        // if (window.innerWidth >= 320) {
        //     timeOutChangeStickyH2 = 0;
        // } else {
        //     timeOutChangeStickyH2 = 0;
        // }
        if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
            aFBM.adjustFooterBottomPadding();
        } else {
            // console.log('Resetting footer bottom margin.');
            aFBM.footer.style.marginBottom = '';
        }
        // timeOutResize = setTimeout(function() {
            cSH2.changeStickyH2();
        // }, timeOutChangeStickyH2);
    });
    
    window.addEventListener ('scroll', function() {
        if (timeOutResize) {
            clearTimeout(timeOutResize);
        }
        // if (window.innerWidth >= 320) {
        //     timeOutChangeStickyH2 = 0;
        // } else {
        //     timeOutChangeStickyH2 = 0;
        // }
        // timeOutResize = setTimeout(function() {
            cSH2.changeStickyH2();
        // }, timeOutChangeStickyH2);
    });
    return null;
}

export default javascript;
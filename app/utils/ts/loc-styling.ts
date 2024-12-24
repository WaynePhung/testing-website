export const handleLoC = (contentRef: React.RefObject<HTMLElement>) => {
        
    const header = document.querySelector('header'),
          title = document.querySelector('#title'),
          aside = document.querySelector('aside');
        
    if (header && title && aside) {
        const 
            headerHeight = header.offsetHeight,
            getPaddingLeft = parseInt(window.getComputedStyle(title).paddingLeft, 10),
            getPaddingRight = parseInt(window.getComputedStyle(title).paddingRight, 10),
            distanceFromBottom = 16;
        let toCStyles;
        if (window.innerWidth < 320) {
            toCStyles = {
                width: `calc(100% - ${getPaddingLeft}px - ${getPaddingRight}px)`,
                // width: `calc(100% - 32px)`,
                bottom: `${distanceFromBottom}px`
            };
            Object.assign(aside.style, toCStyles);
            // console.log('Window width: ' + window.innerWidth + ' toC space from bottom: ' + parseInt(window.getComputedStyle(aside).bottom, 10));
        } else if (window.innerWidth >= 320 && window.innerWidth < 1024) {
            toCStyles = {
                width: `calc(100% - ${getPaddingLeft}px - ${getPaddingRight}px)`,
                // width: `calc(100% - 32px)`,
                bottom: `${headerHeight + distanceFromBottom}px`
            };
            Object.assign(aside.style, toCStyles);
            // console.log('Window width: ' + window.innerWidth + ' toC space from bottom: ' + parseInt(window.getComputedStyle(aside).bottom, 10));
        } else {
            
        }
    }
};
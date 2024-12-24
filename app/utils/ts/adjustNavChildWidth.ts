export function adjustNavChildWidth() {
    const anchorLinkContainer = document.querySelector('nav.anchorLinks');
    const contactButtonsContainer = document.querySelector('.contactButtons');
    if (anchorLinkContainer instanceof HTMLElement && contactButtonsContainer instanceof HTMLElement && window.innerWidth <= 715) {
        let aLCWidth = anchorLinkContainer.clientWidth;
        contactButtonsContainer.style.width = `${aLCWidth}px`;
    } else {
        if (contactButtonsContainer instanceof HTMLElement && window.innerWidth > 700) {
            contactButtonsContainer.style.width = "";
        } else {
            // Do nothing.
        }
    }
}
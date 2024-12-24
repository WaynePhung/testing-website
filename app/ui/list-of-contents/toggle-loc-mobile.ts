export const toggleLoCDisplay = (element: HTMLElement) => {
    let header = document.querySelector('header')!,
        aside = document.querySelector('aside')!;
    if (window.innerWidth >= 1024) {
        element.style.display = '';
        aside.style.bottom = '';
        aside.style.top = `calc(${header.offsetHeight}px + 16px)`;
    } else if (window.innerWidth >= 320 && window.innerWidth < 1024) {
        if (element.style.display === 'none') {
            element.style.display = '';
            aside.style.top = '';
            aside.style.bottom = `calc(${header.offsetHeight}px + 16px)`;
        } else {
            element.style.display = 'none';
        }
    } else {
        if (element.style.display === 'none') {
            element.style.display = '';
            aside.style.top = '';
            aside.style.bottom = "16px";
        } else {
            element.style.display = 'none';
        }
    }
};
export const adjustFooterMargin = () => {
  const header = document.getElementsByTagName('header');
  const footer = document.getElementsByTagName('footer');
  if (header instanceof HTMLElement && footer instanceof HTMLElement) {
    footer.style.marginBottom = `${header.offsetHeight}px`;
  }
};
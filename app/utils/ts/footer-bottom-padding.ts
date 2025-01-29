// adjustFooterBottomPadding.ts

const adjustFooterBottomPadding = (header: HTMLElement, footer: HTMLElement): void => {
  // console.log('footer:', footer, 'header:', header);

  const totalBottomPadding = header.offsetHeight + 16;
  // console.log('Header height:', totalBottomPadding);

  const currentFooterPadding = parseInt(getComputedStyle(footer).paddingBottom, 10);
  // console.log('Current footer bottom padding:', currentFooterPadding);

  // footer.style.paddingBottom = `${totalBottomPadding}px`;

  const newFooterPadding = parseInt(getComputedStyle(footer).paddingBottom, 10);
  // console.log('New footer bottom padding:', newFooterPadding);
};

export default adjustFooterBottomPadding;
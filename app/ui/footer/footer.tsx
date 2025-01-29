import { forwardRef, ForwardedRef } from 'react';
import FooterWrapper from "./footer-wrapper";

const Footer = forwardRef<HTMLElement, {}>((props, ref: ForwardedRef<HTMLElement>) => {
    return <FooterWrapper ref={ref} />;
});

Footer.displayName = 'Footer';

export default Footer;
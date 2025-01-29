import { forwardRef, ForwardedRef } from 'react';
import HeaderWrapper from "./header-wrapper";

const Header = forwardRef<HTMLElement, {}>((props, ref: ForwardedRef<HTMLElement>) => {
    return <HeaderWrapper ref={ref} />;
});

Header.displayName = 'Header';

export default Header;
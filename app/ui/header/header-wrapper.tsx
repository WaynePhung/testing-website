"use client";

import { forwardRef, useEffect, ForwardedRef } from 'react';
import { usePathname } from "next/navigation";
import ProgressBar from "../progress-bar/progress-bar";
import { GlobalNavComponents } from "../navigation/global-nav-components";

const HeaderWrapper = forwardRef<HTMLElement, {}>((props, ref: ForwardedRef<HTMLElement>) => {
    const pathname = usePathname();
    let pageString = pathname === '/' ? "home" : "global";

    useEffect(() => {
        if (ref && typeof ref === 'object' && ref.current) {
            const existingHeader = document.querySelector('header');
            if (existingHeader && existingHeader.parentNode) {
                existingHeader.parentNode.replaceChild(ref.current, existingHeader);
            }
        }
    }, [ref]);

    return (
        <header ref={ref} role="banner" aria-label="navigation header">
            <GlobalNavComponents />
            <ProgressBar />
        </header>
    );
});

HeaderWrapper.displayName = 'HeaderWrapper';

export default HeaderWrapper;

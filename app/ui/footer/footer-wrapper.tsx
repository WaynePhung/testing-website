"use client";

import { forwardRef, useEffect, ForwardedRef } from 'react';
import { GlobalNavComponents } from "../navigation/global-nav-components";
import { PTag } from "./../../ui/text/text-tags";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";

const FooterWrapper = forwardRef<HTMLElement, {}>((props, ref: ForwardedRef<HTMLElement>) => {
    const { isLoaded, isVisible } = useDelayedLoad({ delay: 0, breakpoint: { minWidth: 1024 } });

    useEffect(() => {
        if (ref && typeof ref === 'object' && ref.current) {
            const existingFooter = document.querySelector('footer');
            if (existingFooter && existingFooter.parentNode) {
                existingFooter.parentNode.replaceChild(ref.current, existingFooter);
            }
        }
    }, [ref]);

    return (
        <footer ref={ref} role="footer" aria-label="footer">
            {isVisible ? <GlobalNavComponents /> : <PTag>End of Page</PTag>}
        </footer>
    );
});

FooterWrapper.displayName = 'FooterWrapper';

export default FooterWrapper;

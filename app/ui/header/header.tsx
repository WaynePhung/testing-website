"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
import { useScrollToSection } from "./../../utils/ts/anchorLinkScrollSpy";
import ProgressBar from "../progress-bar/progress-bar";
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";
import GlobalNavComponents from "../navigation/global-nav-components";

// interface Header {
//     pageString?: "home" | "global";
// }

export default function DefaultHeader() {
    const pathname = usePathname();
    // const hash = window.location.hash;
    let pageString;
    if (pathname === '/') {
        pageString = "home";
    } else {
        pageString = "global";
    }
    console.log('pageString: ' + pageString);

    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (windowWidth === null) {
        return null; // or a loading indicator
    }

    return (
        <header role="banner" aria-label="navigation header" id="top-of-page">
            {/* navigation tab: Container for all of the buttons, but not the progress bar. */}
            <GlobalNavComponents />
            <ProgressBar />
        </header>
    );
}
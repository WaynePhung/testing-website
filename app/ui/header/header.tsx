"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
import { useScrollToSection } from "./../../utils/ts/anchorLinkScrollSpy";
import ProgressBar from "../progress-bar/progress-bar";
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";

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
            <nav className="navigationBar" role="navigation" aria-label="group of navigation links">
                {/* "Wayne Phung" button to redirect to the home page. */}
                <LinkComponent 
                    group="link-global"
                    alias="home" 
                    anchorLink={false}
                    showBuffer={pageString == "home" ? false : true}
                />
                {/* Buttons to direct to general sections of the website, including design work, media work, description about me, and contact section.
                The "Contact Me" button appears contained only in the mobile view. */}
                <nav className="anchorLinks" role="anchorLinks" aria-label="group of main mavigation links">
                    <LinkComponent 
                        group="link-global"
                        alias="design" 
                        page={pageString == "home" ?  "home" : "global"} 
                        anchorLink={pageString == "home" ? true : false} 
                        showBuffer={pageString == "home" ? false : true}
                    />
                    <LinkComponent 
                        group="link-global"
                        alias="media" 
                        page={pageString == "home" ?  "home" : "global"} 
                        anchorLink={pageString == "home" ? true : false} 
                        showBuffer={pageString == "home" ? false : true}
                    />
                    <LinkComponent 
                        group="link-global"
                        alias="about" 
                        page={pageString == "home" ?  "home" : "global"} 
                        anchorLink={pageString == "home" ? true : false}
                        showBuffer={pageString == "home" ? false : true}
                    />
                    <LinkComponent 
                        group="link-global"
                        alias="timeline" 
                        anchorLink={pageString == "home" ? true : false}
                        showBuffer={pageString == "home" ? false : true}
                    />
                </nav>
                {/* The "Contact Me" button here appears on the lower/upper-right side of the screen for tablet and desktop screen sizes. */}
                {window.innerWidth < 1024 && 
                    <ButtonComponent 
                        group="link-global"
                        alias="contact" 
                        anchorLink={false}
                        icon={false}
                        showBuffer={false}
                        buttonType="primary" 
                    />
                }
                {window.innerWidth >= 1024 && 
                    <div className="contactButtons">
                        <ButtonComponent 
                            group="link-global"
                            alias="linkedIn" 
                            anchorLink={false}
                            icon={true} 
                            imagePosition="before" 
                            showBuffer={false}
                            buttonType="primary" 
                        />
                        <ButtonComponent 
                            group="link-global"
                            alias="email" 
                            anchorLink={false}
                            icon={true} 
                            imagePosition="before" 
                            showBuffer={false}
                            buttonType="primary" 
                        />
                    </div>
                }
            </nav>
            <ProgressBar />
        </header>
    );
}
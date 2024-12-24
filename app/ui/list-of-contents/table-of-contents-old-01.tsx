"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import Image from "next/image";
// import { LinkComponent } from "../ui/links/link";
import ButtonComponent from "../buttons/button";
import { locLinkProps, topOfPageMobileID, topOfPageDesktopID, otherCaseStudiesPropsMobileID, otherCaseStudiesPropsDesktopID} from "./loc-link-props";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { toggleLoCDisplay } from "./toggle-loc-mobile";
import { updateAsidePosition, throttle } from "./loc-sticky";

interface caseStudyType {
    caseStudy: string;
}

export default function ESLoC({ caseStudy="electricStride" } : caseStudyType) : React.ReactElement | null {
    const 
        [screenSize, setScreenSize] = useState(false),
        targetRef = useRef<HTMLElement>(null),
        handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            // if (pathname === "/" && anchorLink === "true") {
                // event.preventDefault();
                if (targetRef.current) {
                    toggleLoCDisplay(targetRef.current);
                }
            // if (type == "tableOfContents" && targetRef.current) {
            // } else {
            //     // Do nothing.
            // }
        };
    
    useEffect(() => {
        const checkScreenSize = () => {
            setScreenSize(window.innerWidth <= 1024);
            if (targetRef.current) {
                let header = document.querySelector('header')!,
                    aside = document.querySelector('aside')!;
                if (window.innerWidth >= 1024) {
                    if (targetRef.current.style.display == 'none') {
                        toggleLoCDisplay(targetRef.current);
                    }
                    aside.style.top = `calc(${header.offsetHeight}px + 16px)`;
                    aside.style.bottom = '';
                } else if (window.innerWidth >= 320 && window.innerWidth < 1024) {
                    if (targetRef.current.style.display == '') {
                        toggleLoCDisplay(targetRef.current);
                    }
                    aside.style.top = '';
                    aside.style.bottom = `calc(${header.offsetHeight}px + 16px)`;
                } else if (window.innerWidth < 320) {
                    if (targetRef.current.style.display == '') {
                        toggleLoCDisplay(targetRef.current);
                    }
                    aside.style.top = '';
                    aside.style.bottom = "16px";
                } else {
                    // Do nothing.
                }
            }
          };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const 
        [isWithinBounds, setIsWithinBounds] = useState(false),
        handleScroll = useCallback(() => {
            const { isWithinBounds: newIsWithinBounds } = updateAsidePosition();
            if (newIsWithinBounds !== isWithinBounds) {
              setIsWithinBounds(newIsWithinBounds);
            }
          }, [isWithinBounds]),
        throttledHandleScroll = useCallback(
            throttle(handleScroll, 100),
            [handleScroll]
        );
    useEffect(() => {
        // Initial check
        handleScroll();
    
        // Attach throttled scroll event listener
        window.addEventListener('scroll', throttledHandleScroll);
    
        // Cleanup function
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [throttledHandleScroll]);

    useEffect(() => {
        const header = document.querySelector('header')!,
            aside = document.querySelector('aside');
        if (aside) {
            if (isWithinBounds) {
                aside.classList.add('sticky-active');
                // aside.style.top = `calc(${header.offsetHeight}px + 16px)`;
                // aside.style.bottom = '';
            } else {
                aside.classList.remove('sticky-active');
                // aside.style.top = '';
                // aside.style.bottom = `calc(${header.offsetHeight}px + 16px)`;
            }
        }
    }, [isWithinBounds]);

    let toc, 
        tocObject,
        objectEntries;
    switch (caseStudy) {
        case ("electricStride"):
            tocObject = LoCElectricStride();
        default:
            tocObject = LoCElectricStride();
    }
    // if (tocObject != null && tocObject) {
        objectEntries = Object.entries(tocObject);
        // console.log('objectEntries: ' + objectEntries);
        const [firstEntry, ...middleEntries] = objectEntries;
        // console.log('firstEntry index 0: ' + firstEntry[1].href);
        const lastEntry = objectEntries[objectEntries.length - 1];
    // }
    toc = <ButtonComponent type="tableOfContents" imagePosition="before" onClick={handleClick}></ButtonComponent>;
    // if (screenSize) {
    //     toc = 
    //         <ButtonComponent type="tableOfContents" imagePosition="before"></ButtonComponent>;
    // } else {
    //     if (tocObject != null) {
    //         toc = 
    //             <aside role="navigation">
    //                 <Link 
    //                     href={firstEntry[1].href}
    //                     aria-label={firstEntry[1].ariaLabel}
    //                     role={firstEntry[1].role}
    //                 >
    //                     <span className={noto_sans.className}>
    //                         {firstEntry[1].text}
    //                     </span>
    //                 </Link>
    //                 {middleEntries.slice(0, -1).map(([section, items]) => {
    //                     return (
    //                         <Link 
    //                             key={section}
    //                             href={items.href}
    //                             aria-label={items.ariaLabel}
    //                             role={items.role}
    //                         >
    //                             {/* <picture className={items.icon.imageClasses}>
    //                                 <Image
    //                                 src={items.icon.imageSrc}
    //                                 width={items.icon.width}
    //                                 height={items.icon.height}
    //                                 alt={items.icon.alt}
    //                                 loading={items.icon.loading}
    //                                 />
    //                             </picture> */}
    //                             <span className={noto_sans.className}>
    //                                 {items.text}
    //                             </span>
    //                         </Link>
    //                     );
    //                 })}
    //                 <Link 
    //                     href={lastEntry[1].href}
    //                     aria-label={lastEntry[1].ariaLabel}
    //                     role={lastEntry[1].role}
    //                 >
    //                     <span className={noto_sans.className}>
    //                         {lastEntry[1].text}
    //                     </span>
    //                 </Link>
    //             </aside>;
    //     }
    // }

    return (
        // <>
        //     {toc}
        // </>
        <aside role="navigation">
            {screenSize && toc}
            <Link 
                href={topOfPageDesktopID.href}
                aria-label={topOfPageDesktopID.ariaLabel}
                id={topOfPageDesktopID.id}
                role={topOfPageDesktopID.role}
            >
                <span className={noto_sans.className}>
                    {topOfPageDesktopID.text}
                </span>
            </Link>
            {/* {middleEntries.slice(0, -1).map(([section, items]) => { */}
            <nav className="tocNavLinks" ref={targetRef}>
                {[firstEntry, ...middleEntries].map(([section, items]) => {
                    return (
                        <Link 
                            key={section}
                            href={items.href}
                            aria-label={items.ariaLabel}
                            id={items.id}
                            role={items.role}
                            onClick={handleClick}
                        >
                            {/* <picture className={items.icon.imageClasses}>
                                <Image
                                src={items.icon.imageSrc}
                                width={items.icon.width}
                                height={items.icon.height}
                                alt={items.icon.alt}
                                loading={items.icon.loading}
                                />
                            </picture> */}
                            <span className={noto_sans.className}>
                                {items.text}
                            </span>
                        </Link>
                    );
                })}
            </nav>
            <Link 
                href={otherCaseStudiesPropsDesktopID.href}
                aria-label={otherCaseStudiesPropsDesktopID.ariaLabel}
                id={otherCaseStudiesPropsDesktopID.id}
                role={otherCaseStudiesPropsDesktopID.role}
            >
                <span className={noto_sans.className}>
                    {otherCaseStudiesPropsDesktopID.text}
                </span>
            </Link>
        </aside>
    );
}
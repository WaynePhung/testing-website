"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from "next/navigation";
import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import Image from "next/image";
import { getLinkProps } from "./../../utils/ts/link-types";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
import { SpanTag } from "../text/text-tags";
import { locLinkProps, topOfPageMobileID, topOfPageDesktopID, otherCaseStudiesPropsMobileID, otherCaseStudiesPropsDesktopID} from "./loc-link-props";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { LoCTTVReel } from "../../(case study)/triton-television-reel/loc-ttv-reel";
import { LoCDefault } from "./loc-link-props";
import { toggleLoCDisplay } from "./toggle-loc-mobile";
import { updateAsidePosition, throttle } from "./loc-sticky";
import { setActiveLink } from "@/app/utils/ts/active-link-styling";
import { indefinite } from "@/app/utils/ts/exported-constants";

interface caseStudyType {
    caseStudy: string;
}

export default function ListOfContents({ caseStudy } : caseStudyType) : React.ReactElement | null {
    const 
        [screenSize, setScreenSize] = useState(false),
        targetRef = useRef<HTMLElement>(null),
        pathname = usePathname(),
        handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (targetRef.current) {
                toggleLoCDisplay(targetRef.current);
            }
            const getTarget = event.target;
            if (getTarget instanceof HTMLElement) {
                const getTagName = getTarget.tagName;
                console.log('Tag name: ' + getTagName);
                if (getTagName === 'A') {
                    if (getTarget.getAttribute('href')) {
                        const getHref = getTarget.getAttribute('href');
                        if (getHref != null) {
                            console.log('getHref: ' + getHref);
                            setActiveLink(getHref, pathname, true);
                        } else {
                            // Do nothing.
                        }
                    }
                } else if (getTagName === 'SPAN') {
                    const getParentElementTag = getTarget.parentElement;
                    if (getParentElementTag && getParentElementTag.tagName === 'A') {
                        if (getParentElementTag.getAttribute('href')) {
                            const getHref = getParentElementTag.getAttribute('href');
                            if (getHref != null) {
                                console.log('getHref: ' + getHref);
                                setActiveLink(getHref, pathname, true);
                            } else {
                                // Do nothing.
                            }
                        }
                    }
                }
            } else {
                // Do nothing.
            }
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
    // console.log('LoC case study: ' + caseStudy);
    switch (caseStudy) {
        case ("es"):
            tocObject = LoCElectricStride();
            break;
        case ("ttvReel"):
            tocObject = LoCTTVReel();
            break;
        default:
            tocObject = LoCDefault();
            break;
    }
    // if (tocObject != null && tocObject) {
        objectEntries = Object.entries(tocObject);
        // console.log('objectEntries: ' + objectEntries);
        const [firstEntry, ...middleEntries] = objectEntries;
        // console.log('firstEntry index 0: ' + firstEntry[1].href);
        const lastEntry = objectEntries[objectEntries.length - 1];
    // }
    toc = 
        <ButtonComponent 
            group="link-global" 
            alias="listOfContents" 
            anchorLink={false}
            icon={true}
            imagePosition="before" 
            onClick={handleClick} 
            showBuffer={false}
            buttonType="secondary" 
        />;

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // const loadedState = localStorage.getItem(`${mediaType}-${mediaAlias}-loaded`);
        setTimeout(() => {
            // if (loadedState === 'true') {
                setIsLoaded(true);
                // setHasLoaded(true);
            // }
        // }, 5000); // 5 seconds delay
        }, indefinite); // plenty of seconds for initial load
    }, []);
    
    const handleLoad = () => {
        setTimeout(() => {
            setIsLoaded(true);
            // setHasLoaded(true);
            // localStorage.setItem(`${mediaType}-${mediaAlias}-loaded`, 'true');
        // }, 5000); // 5 seconds delay
        }, indefinite); // plenty of seconds for initial load
    };
    if (!isLoaded && !hasLoaded) {
        let linkPropsObject = getLinkProps();
        return(
            <aside role="navigation">
                {screenSize && toc}
                <LinkComponent 
                    group="link-global"
                    alias={"placeholder_button_icon"} 
                    anchorLink={true}
                    icon={true}
                    imagePosition="before" 
                    onClick={(e) => e.preventDefault()}
                    showBuffer={false}
                />
                <nav className="tocNavLinks" ref={targetRef}>
                    {[firstEntry, ...middleEntries].map(([section, items]) => {
                        return (
                            <LinkComponent 
                                key={section}
                                group="link-global"
                                alias={"placeholder_button_icon"} 
                                anchorLink={false}
                                icon={true}
                                imagePosition="before" 
                                onClick={(e) => e.preventDefault()}
                                showBuffer={false}
                            />
                        );
                    })}
                </nav>
                <LinkComponent 
                    group="link-global"
                    alias={"placeholder_button_icon"} 
                    anchorLink={true}
                    icon={true}
                    imagePosition="before" 
                    onClick={(e) => e.preventDefault()}
                    showBuffer={false}
                />
            </aside>
        );
    } else {
        console.log('tocObject["otherCaseStudies"].href: ' + tocObject["otherCaseStudies"].href);
        return (
            <aside role="navigation">
                {screenSize && toc}
                <LinkComponent 
                    group="loc"
                    subgroup={caseStudy}
                    alias="topOfPage"
                    getHref={tocObject["topOfPage"].href}
                    aria-label={tocObject["topOfPage"].ariaLabel}
                    id={tocObject["topOfPage"].id}
                    anchorLink={true}
                    icon={true}
                    imagePosition="before"
                    role={tocObject["topOfPage"].role}
                    showBuffer={false}
                />
                    {/* <span className={noto_sans.className}>
                        {topOfPageDesktopID.text}
                    </span> */}
                {/* </LinkComponent> */}
                {/* {middleEntries.slice(0, -1).map(([section, items]) => { */}
                <nav className="tocNavLinks" ref={targetRef}>
                    {[firstEntry, ...middleEntries].map(([section, items]) => {
                        console.log('section: ' + section);
                        console.log('items: ' + items);
                        console.log('items.href: ' + items.href);
                        console.log('items.ariaLabel: ' + items.ariaLabel);
                        return (
                            <LinkComponent 
                                key={section}
                                group="loc"
                                subgroup={caseStudy}
                                alias={section}
                                getHref={items.href}
                                anchorLink={true}
                                aria-label={items.ariaLabel}
                                id={items.id}
                                icon={true}
                                imagePosition="before" 
                                role={items.role}
                                onClick={handleClick}
                                showBuffer={false}
                            />
                            // <Link 
                            //     key={section}
                            //     href={items.href}
                            //     aria-label={items.ariaLabel}
                            //     id={items.id}
                            //     role={items.role}
                            //     onClick={handleClick}
                            // >
                            //     <picture className={items.icon.imageClasses}>
                            //         <Image
                            //         src={items.icon.imageSrc}
                            //         width={items.icon.width}
                            //         height={items.icon.height}
                            //         alt={items.icon.alt}
                            //         loading={items.icon.loading}
                            //         />
                            //     </picture>
                                /* <span className={noto_sans.className}>
                                    {items.text}
                                </span> */
                                /* <SpanTag>
                                    {items.text}
                                </SpanTag> */
                            /* </Link> */
                        );
                    })}
                </nav>
                {/* <LinkComponent 
                    type="otherCaseStudies"
                    getHref={tocObject["otherCaseStudies"].href}
                    aria-label={tocObject["otherCaseStudies"].ariaLabel}
                    id={tocObject["otherCaseStudies"].id}
                    role={tocObject["otherCaseStudies"].role}
                /> */}
                <LinkComponent 
                    group="loc"
                    subgroup={caseStudy}
                    alias="otherCaseStudies"
                    getHref={tocObject["otherCaseStudies"].href}
                    aria-label={tocObject["otherCaseStudies"].ariaLabel}
                    id={tocObject["otherCaseStudies"].id}
                    anchorLink={true}
                    icon={true}
                    imagePosition="before" 
                    role={tocObject["otherCaseStudies"].role}
                    showBuffer={false}
                />
            </aside>
        );
    }
}
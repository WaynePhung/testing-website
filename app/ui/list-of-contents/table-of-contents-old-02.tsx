"use client"

import { createContext, useContext, useState, useEffect, useCallback, useRef,  ReactNode } from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import NextLink from "next/link";
import ButtonComponent from "../buttons/button";
import { topOfPageDesktopID, otherCaseStudiesPropsDesktopID} from "./loc-link-props";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { toggleLoCDisplay } from "./toggle-loc-mobile";
import { updateAsidePosition, throttle } from "./loc-sticky";

interface LinkContextType {
    clickCounts: Record<string, number>;
    lastClickedHref: string | null;
    maxClicks: number;
    resetClickCount: (href: string) => void;
    incrementClickCount: (href: string) => void;
  }
  
const defaultContextValue: LinkContextType = {
    clickCounts: {},
    lastClickedHref: null,
    maxClicks: 1,
    resetClickCount: () => {},
    incrementClickCount: () => {},
};

interface caseStudyType {
    caseStudy: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const LinkContext = createContext<LinkContextType>(defaultContextValue);

export default function createTableofContents() {
    function LoCLinkProvider({ children, maxClicks = 1 }: { children: ReactNode; maxClicks?: number }) {
        const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
        const [lastClickedHref, setLastClickedHref] = useState<string | null>(null);
    
        const resetClickCount = (href: string) => {
          setClickCounts((prev) => ({ ...prev, [href]: 0 }));
          setLastClickedHref(href);
        };
    
        const incrementClickCount = (href: string) => {
          setClickCounts((prev) => ({ ...prev, [href]: (prev[href] || 0) + 1 }));
        };
    
        const value: LinkContextType = {
          clickCounts,
          lastClickedHref,
          maxClicks,
          resetClickCount,
          incrementClickCount,
        };
    
        return (
            <LinkContext.Provider value={value}>
                {children}
            </LinkContext.Provider>
        );
    }

    function TableofContents({ caseStudy="electricStride", onClick } : caseStudyType) : React.ReactElement | null {

            const 
                [screenSize, setScreenSize] = useState(false),
                targetRef = useRef<HTMLElement>(null)
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
                const aside = document.querySelector('aside');
                if (aside) {
                    if (isWithinBounds) {
                        // aside.classList.add('sticky-active');
                        // if (window.innerWidth < 320) {
                        //     aside.style.display = "";
                        // }
                    } else {
                        // aside.classList.remove('sticky-active');
                        // if (window.innerWidth < 320) {
                        //     aside.style.display = "none";
                        // }
                    }
                }
            }, [isWithinBounds]);

        let tocObject, objectEntries;
        switch (caseStudy) {
            case ("electricStride"):
                tocObject = LoCElectricStride();
                break;
            default:
                tocObject = LoCElectricStride();
                break;
        }
        objectEntries = Object.entries(tocObject);
        const [firstEntry, ...middleEntries] = objectEntries;
        // console.log('objectEntries: ' + JSON.stringify(objectEntries));
        // for (let i = 0; i < objectEntries.length; i++) {
        //     console.log('get first-level key: ' + JSON.stringify(objectEntries[i]));
        //     for (let j = 0; j < objectEntries[1].length; j++) {
        //         console.log('get second-level key: ' + JSON.stringify(objectEntries[1][j]));
        //     }
        // }
        // console.log('get href: ' + JSON.stringify(objectEntries[1][1].href));
        const lastEntry = objectEntries[objectEntries.length - 1];

        const { clickCounts, lastClickedHref, maxClicks, resetClickCount, incrementClickCount } = useContext(LinkContext);
        const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            const target = e.target,
                {getHrefConstant} = tocObject;
            if (target instanceof HTMLElement) {
                const checkTagName = target.tagName;
                // console.log('Tag name: ' + checkTagName);
                if (checkTagName === 'A' && target.getAttribute('href')) {
                    let getHref = target.getAttribute('href');
                    // console.log('getHref: ' + getHref);
                    if (getHref) {
                        if (getHref !== lastClickedHref) {
                            resetClickCount(getHref);
                        }
                        incrementClickCount(getHref);
                        if (((clickCounts[getHref] || 0) < maxClicks) && onClick) {
                            onClick(e);
                        } else {
                            e.preventDefault();
                            // console.log(`Clicked ${maxClicks} times. Click ignored.`);
                        }
                    }
                } else if (checkTagName === 'BUTTON') {
                    if (targetRef.current) {
                        toggleLoCDisplay(targetRef.current);
                    }
                } else {
                    // Do nothing.
                }
            }                
        }, [lastClickedHref, clickCounts, maxClicks, onClick, resetClickCount, incrementClickCount]);

        let toc = <ButtonComponent type="tableOfContents" imagePosition="before" onClick={handleClick}></ButtonComponent>;
    
        return (
            <aside role="navigation">
                {screenSize && toc}
                <Link 
                    href={topOfPageDesktopID.href}
                    aria-label={topOfPageDesktopID.ariaLabel}
                    id={topOfPageDesktopID.id}
                    role={topOfPageDesktopID.role}
                    onClick={handleClick}
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
                    onClick={handleClick}
                >
                    <span className={noto_sans.className}>
                        {otherCaseStudiesPropsDesktopID.text}
                    </span>
                </Link>
            </aside>
        );
    };
    return { LoCLinkProvider, TableofContents};
}
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter, usePathname } from 'next/navigation';
import { useDelayedLoad } from "../placeholders/loading-placeholder";
import { useScrollToSection } from "@/app/utils/ts/anchorLinkScrollSpy";

import { LinkProps, SeeCaseStudyProps, getLinkProps } from "./../../utils/ts/link-types";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { LoCTTVReel } from "../../(case study)/triton-television-reel/toc-ttv-reel";
import { noto_sans } from "./../../utils/text-styling/fonts";
import checkDataBufferAttr from "./../../ui/buffer-page/check-data-buffer-attr";
import { SafeHTML } from "./../../ui/text/safe-html";
import { setActiveLink } from "@/app/utils/ts/active-link-styling";
import changeBPText from "../buffer-page/change-bp-text";
import bpTransitionEffect from "../buffer-page/bp-transition-effect";
import { SpanTag } from "../text/text-tags";

export interface LinkType {
    className?: string;
    type: string;
    page?: "home" | "global";
    id?: string;
    getHref?: Url | string;
    anchorLink?: "true" | "false" | "" | undefined;
    isActive?: boolean;
    caseStudy?: string;
    imagePosition?: "before" | "after";
    role?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    showBuffer?: "true" | "false";
    // children: React.ReactNode;
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function LinkComponent({ className, type, page, id,  getHref="/", anchorLink, isActive, caseStudy, imagePosition, role, onClick, showBuffer} : LinkType) : React.ReactElement | null {
    // const 
    //     linkPropsObject = getLinkProps("home"),
    //     getPropsHref = linkPropsObject[type];
    
    let linkPropsObject;
    if (page == "home") {
        linkPropsObject = getLinkProps(page);
    } else if (type == "loc-section") {
        switch (caseStudy) {
            case ("electricStride"):
                linkPropsObject = LoCElectricStride();
                break;
            case ("ttvReel"):
                linkPropsObject = LoCTTVReel();
                break;
            default:
                linkPropsObject = LoCElectricStride();
                break;
        }
    } else {
        linkPropsObject = getLinkProps();
    }

    const getPropsHref = linkPropsObject[type];
    if (!getPropsHref) {
        console.warn(`No navigation getPropsHref found for type: ${type}`);
        return null;
    }

    const pathname = usePathname();
    // let getHref: Url ="/";
    if (type == "seeCaseStudy" && caseStudy) {
        if (pathname === "/") {
            getHref = "" + (getPropsHref as SeeCaseStudyProps).href[caseStudy];
        } else {
            getHref = "/" + (getPropsHref as SeeCaseStudyProps).href[caseStudy];
        }
    } else {
        getHref = ("" + (getPropsHref as LinkProps).href) || "/";
    }

    const imageElement = getPropsHref.icon && (
        <picture className={getPropsHref.icon.imageClasses}>
            <Image
                src={getPropsHref.icon.imageSrc}
                width={getPropsHref.icon.width}
                height={getPropsHref.icon.height}
                alt={getPropsHref.icon.alt}
                loading={getPropsHref.icon.loading}
            />
        </picture>
    );

    const router = useRouter();
    const scrollToSection = useScrollToSection();
    const handleInternalClickEvent = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // if (pathname === "/" && anchorLink === "true") {
        if ((anchorLink === "true") && (pathname === "/")) {
            e.preventDefault();
            scrollToSection.scrollToSection(getHref as string);
        } else if (anchorLink != "true") {
            const [getBuffer, getHref] = checkDataBufferAttr(e);
            if (getBuffer != null && getHref != null) {
                e.preventDefault();
                bpTransitionEffect(getHref);
                await delay(500);
                router.push(getHref);
            } else if (getHref != null) {
                // Do nothing, but proceed the default browser behavior for onClick events will still occur. This is for links that should not show a buffer page but have hrefs.
            } else {
                console.log('checkDataBufferAttr function\'s returned value: ' + checkDataBufferAttr(e));
                console.log('checkDataBufferAttr function return null or an incorrect value');
            }
        } else if (!getHref || getHref == "undefined") {
            console.log('href does not exist.');
            e.preventDefault();
            checkDataBufferAttr(e);
        } else if (onClick) {
            console.log('Default onClick event triggered.');
            checkDataBufferAttr(e);
            onClick(e);
        } else {
            console.log('The link does nothing.');
        }
    };

    const handleMultipleClickEvents = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if ((anchorLink === "true") && (pathname === "/")) {
            e.preventDefault();
            handleInternalClickEvent(e);
        } else if (showBuffer == "true") {
            console.log('Showing buffer page.');
            e.preventDefault();
            const [getBuffer, getHref] = checkDataBufferAttr(e);
            console.log('getBuffer: ' + getBuffer + ' getHref: ' + getHref);
            if (getBuffer != null && getHref != null) {
                bpTransitionEffect(getHref);
                await delay(500);
                router.push(getHref);
            } else {
                console.log('transitionWithBuffer function return null or an incorrect value');
            }
        } else if (!getHref || getHref == "undefined") {
            console.log('href does not exist.');
            e.preventDefault();
        } else if (onClick) {
            console.log('Default onClick event triggered.');
            onClick(e);
        } else {
            console.log('The link does nothing.');
        }
    };

    const { isLoaded, hasLoaded } = useDelayedLoad();

    let linkComponent = 
        <Link 
            id={id ? id : getPropsHref.id}
            className={isActive ? 'active' : ''}
            // href={getHref ? getHref : ' '}
            href={(getHref && getHref != "undefined" && getHref != null) ? getHref : ''}
            aria-label={getPropsHref.ariaLabel}
            rel={getPropsHref.rel}
            target={getPropsHref.target}
            role={role ? role : getPropsHref.role}
            onClick={anchorLink === "true" ? handleMultipleClickEvents : handleInternalClickEvent}
            data-showbuffer={showBuffer == "true" ? "true" : ""}
            // onLoad={() => isLoaded(true)}
            // data-showbuffer={"true"}
        >
            {imagePosition === "before" && imageElement}
            {/* <span className={noto_sans.className}>
                {getPropsHref.text}
            </span> */}
            {/* {
                (!isLoaded && !hasLoaded) ? 
                <LinkSpanTag>
                    {linkPropsObject["placeholder_button_icon"].text}
                </LinkSpanTag> : 
                <LinkSpanTag>
                    {getPropsHref.text}
                </LinkSpanTag>
            } */}
            <SpanTag>
                {getPropsHref.text || ''}
            </SpanTag>
            {/* <LinkSpanTag>
                {linkPropsObject["placeholder_button_icon"].text || ''}
            </LinkSpanTag> */}
            {imagePosition === "after" && imageElement}
        </Link>
    
    if (!isLoaded && !hasLoaded) {
        console.log("linkPropsObject[\"placeholder_button_icon\"].text: " + linkPropsObject["placeholder_button_icon"].text);
        console.log("getPropsHref.text: " + getPropsHref.text);
        return (
        //     <Link 
        //     className={`${className && className} ${isActive ? 'active' : ''}`}
        //     href=""
        //     // href={(getHref && getHref != "undefined" && getHref != null) ? getHref : ''}
        //     aria-label={linkPropsObject["placeholder_button_icon"].ariaLabel}
        //     role={linkPropsObject["placeholder_button_icon"].role}
        //     onLoad={handleLoad}
        // >
            // {imagePosition === "before" && imageElement}
            <div className="link-span-placeholder-line">
            </div>
            // <RawLinkSpanTag>
            //     {linkPropsObject["placeholder_button_icon"].text || ''}
            // </RawLinkSpanTag>
            // <LinkSpanTag>
                // {linkPropsObject["placeholder_button_icon"].text || 'link'}
            // </LinkSpanTag>
            // {imagePosition === "after" && imageElement}
        // </Link>
        );
    } else {
        console.log("getPropsHref.text: " + getPropsHref.text);
        return (
            <Link 
                id={id ? id : getPropsHref.id}
                className={`${className ? className : ''}${isActive ? ' active' : ''}`}
                // href={getHref ? getHref : ' '}
                href={(getHref && getHref != "undefined" && getHref != null) ? getHref : ''}
                aria-label={getPropsHref.ariaLabel}
                rel={getPropsHref.rel}
                target={getPropsHref.target}
                role={role ? role : getPropsHref.role}
                onClick={anchorLink === "true" ? handleMultipleClickEvents : handleInternalClickEvent}
                data-showbuffer={showBuffer == "true" ? "true" : ""}
                // onLoad={handleLoad}
                // data-showbuffer={"true"}
            >
                {imagePosition === "before" && imageElement}
                <SpanTag>
                    {getPropsHref.text || 'Text'}
                </SpanTag>
                {/* <LinkSpanTag>
                    {getPropsHref.text || ''}
                </LinkSpanTag> */}
                {imagePosition === "after" && imageElement}
        </Link>
        );
    }
    return linkComponent;
}

// export function NavLink ({href, ariaLabel, id, children} : NavLinkProps) {

//     return (
//         <Link href={href} className={`${noto_sans.className} navLink`} id={id && id} role="link" aria-label={ariaLabel}>
//             <span>{children}</span>
//         </Link>
//     );
// }


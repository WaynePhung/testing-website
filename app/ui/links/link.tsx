"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter, usePathname } from 'next/navigation';
import { useDelayedLoad } from "../placeholders/loading-placeholder";
import { useScrollToSection } from "@/app/utils/ts/anchorLinkScrollSpy";

import { DynamicMedia, ImageMedia } from "../media/media-content";
import { LinkProps, SeeCaseStudyProps, getLinkProps } from "./../../utils/ts/link-types";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { LoCTTVReel } from "../../(case study)/triton-television-reel/loc-ttv-reel";
import { LoCDefault, locLinkProps } from "../list-of-contents/loc-link-props";
import { iconMediaProps } from "@/app/utils/ts/icon-props";
import { noto_sans } from "./../../utils/text-styling/fonts";
import checkDataBufferAttr from "./../../ui/buffer-page/check-data-buffer-attr";
import { SafeHTML } from "./../../ui/text/safe-html";
import { setActiveLink } from "@/app/utils/ts/active-link-styling";
import changeBPText from "../buffer-page/change-bp-text";
import bpTransitionEffect from "../buffer-page/bp-transition-effect";
import { SpanTag } from "../text/text-tags";
import FigureImageVideo from "../media/media-global";
import getMediaGroupObject from "../media/get-media-group-object";

export interface LinkComponentProps {
    group: "link-global" | "loc";
    subgroup?: string;
    alias: string;
    className?: string;
    id?: string;
    page?: "home" | "global";
    getHref?: Url | string;
    anchorLink: boolean;
    isActive?: boolean;
    icon?: boolean;
    imagePosition?: string;
    role?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    showBuffer: boolean;
    // children: React.ReactNode;
}

type LinkComponentWithIcon = (LinkComponentProps & {icon: true; imagePosition: "before" | "after"});

type LinkComponentWithoutIcon = (LinkComponentProps & {icon: false; imagePosition?: "before" | "after" | undefined});

type LinkComponentCS = ((LinkComponentProps | LinkComponentWithIcon | LinkComponentWithoutIcon) & {group: "loc"; subgroup: string});

type LinkTypes = 
    LinkComponentProps | 
    LinkComponentWithIcon | 
    LinkComponentWithoutIcon | 
    LinkComponentCS;

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function LinkComponent({ group, subgroup, alias, className, id, page, getHref="/", anchorLink, isActive, icon, imagePosition="", role, onClick, showBuffer} : LinkTypes) : React.ReactElement | null {
    // const 
    //     linkPropsObject = getLinkProps("home"),
    //     getProps = linkPropsObject[type];
    const pathname = usePathname();
    const router = useRouter();
    const scrollToSection = useScrollToSection();
    const disableClickEvent = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    }
    const handleInternalClickEvent = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // if (pathname === "/" && anchorLink === "true") {
        if ((anchorLink == true) && (pathname === "/")) {
            e.preventDefault();
            scrollToSection.scrollToSection(getHref as string);
        } else if (anchorLink != true) {
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
        if ((anchorLink == true) && (pathname === "/")) {
            e.preventDefault();
            handleInternalClickEvent(e);
        } else if (showBuffer == true) {
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

    let linkPropsObject, getProps;
    switch(group) {
        case("link-global"):
            if (page == "home") {
                linkPropsObject = getLinkProps(page);
            } else {
                linkPropsObject = getLinkProps();
            }
            if (linkPropsObject) {
                getProps = linkPropsObject[alias];
                if (!getProps) {
                    console.warn(`No navigation getProps found for group: ${group} and alias: ${alias}`);
                    return null;
                } else {
                    if (alias === "seeCaseStudy" && subgroup && typeof getProps === 'object' && 'href' in getProps) {
                        const seeCaseStudyProps = getProps as SeeCaseStudyProps;
                        if (subgroup in seeCaseStudyProps.href) {
                            if (pathname === "/") {
                                getHref = "" + seeCaseStudyProps.href[subgroup];
                            } else {
                                getHref = "/" + seeCaseStudyProps.href[subgroup];
                            }
                        } else {
                            console.warn(`Subgroup "${subgroup}" not found in seeCaseStudy href object`);
                            getHref = "/";
                        }
                    } else {
                        getHref = typeof (getProps as LinkProps).href === "string" ? ("" + (getProps as LinkProps).href) : "/";
                    }
                    getHref = typeof getHref === "string" ? getHref : "/";
                    // console.log('getHref: ' + getHref);
                }
            }
            break;
        case("loc"):
            linkPropsObject = getMediaGroupObject(group, subgroup);
            // switch (subgroup) {
            //     case "" :
            //         linkPropsObject = LoCDefault();
            //         break;
            //     case "es" :
            //         linkPropsObject = LoCElectricStride();
            //         break;
            //     case "ttvReel" :
            //         linkPropsObject = LoCTTVReel();
            //         break;
            //     default :
            //         linkPropsObject = LoCDefault();
            //         break;
            // }
            if (linkPropsObject) {
                getProps = linkPropsObject[alias] as locLinkProps;
                if (!getProps) {
                    console.warn(`No navigation getProps found for group: ${group} and alias: ${alias}`);
                    return null;
                } else {
                    getHref = "" + getProps.href;
                }
            }
            break;
        default:
            break;
    }

    let iconPropsObject, imageElement;
    if (icon && icon == true) {
        if (group == "loc" && subgroup) {
            iconPropsObject = getMediaGroupObject(group, subgroup);
            // function isImageMedia(media: DynamicMedia[keyof DynamicMedia]): media is ImageMedia {
            //     return media.mediaType === 'image';
            // }
            if (iconPropsObject && typeof iconPropsObject === 'object' && alias in iconPropsObject) {
                const media = iconPropsObject[alias] as locLinkProps;
                // if (isImageMedia(media)) {
                    const iconProps = media.icon;
                    if (!isLoaded && !hasLoaded) {
                        imageElement = <FigureImageVideo group={"icon"} mediaAlias={"placeholder_button_icon"} wrappingLink={false} />
                    } else {
                        imageElement = <FigureImageVideo group={"loc"} subgroup={subgroup} mediaAlias={alias} wrappingLink={false} />
                    }
                // }
            }
        } else {
            iconPropsObject = iconMediaProps() as DynamicMedia;
            function isImageMedia(media: DynamicMedia[keyof DynamicMedia]): media is ImageMedia {
                return media.mediaType === 'image';
            }
            
            if (iconPropsObject && typeof iconPropsObject === 'object' && alias in iconPropsObject) {
                const media = iconPropsObject[alias];
                if (isImageMedia(media)) {
                    console.log('icon: ' + icon);
                    console.log('getIconProps src: ' + media.src);
                    if (!isLoaded && !hasLoaded) {
                        imageElement = <FigureImageVideo group={"icon"} mediaAlias={"placeholder_button_icon"} wrappingLink={false} />
                    } else {
                        imageElement = <FigureImageVideo group={"icon"} mediaAlias={alias} wrappingLink={false} />
                    }
                }
            }
        }
    }

    if (linkPropsObject != undefined && getProps != undefined) {
        let linkComponent = 
            <Link 
                id={id ? id : getProps.id}
                className={isActive ? 'active' : ''}
                // href={getHref ? getHref : ' '}
                href={`${getHref && getHref !== "undefined" && getHref !== null ? getHref : ''}`}
                aria-label={getProps.ariaLabel}
                rel={getProps.rel}
                target={getProps.target}
                role={role ? role : getProps.role}
                onClick={anchorLink == true ? handleMultipleClickEvents : handleInternalClickEvent}
                data-showbuffer={showBuffer == true && "true"}
                // onLoad={() => isLoaded(true)}
                // data-showbuffer={"true"}
            >
                {imagePosition === "before" && imageElement}
                {/* <span className={noto_sans.className}>
                    {getProps.text}
                </span> */}
                {/* {
                    (!isLoaded && !hasLoaded) ? 
                    <LinkSpanTag>
                        {linkPropsObject["placeholder_button_icon"].text}
                    </LinkSpanTag> : 
                    <LinkSpanTag>
                        {getProps.text}
                    </LinkSpanTag>
                } */}
                <SpanTag>
                    {getProps.text || ''}
                </SpanTag>
                {/* <LinkSpanTag>
                    {linkPropsObject["placeholder_button_icon"].text || ''}
                </LinkSpanTag> */}
                {imagePosition === "after" && imageElement}
            </Link>
        
        if (!isLoaded && !hasLoaded) {
            console.log("linkPropsObject[\"placeholder_button_icon\"].text: " + getLinkProps()["placeholder_button_icon"].text);
            console.log("getProps.text: " + getProps.text);
            return (
            // <>
            //     {imagePosition === "before" && imageElement}
            //     <SpanTag>Link Text</SpanTag>
            //     {imagePosition === "after" && imageElement}
            // </>
                // <div className="link-span-placeholder-line">
                // </div>
            
            <Link 
                href=""
                // href={(getHref && getHref != "undefined" && getHref != null) ? getHref : ''}
                aria-label={getLinkProps()["placeholder_button_icon"].ariaLabel}
                role={getLinkProps()["placeholder_button_icon"].role}
                onClick={disableClickEvent}
                // onLoad={handleLoad}
            >
                {imagePosition === "before" && imageElement}
                {/* <div className="link-span-placeholder-line">
                </div> */}
                <SpanTag>
                    {getLinkProps()["placeholder_button_icon"].text || ''}
                </SpanTag>
                {/* <RawLinkSpanTag>
                    {linkPropsObject["placeholder_button_icon"].text || ''}
                </RawLinkSpanTag> */}
                {/* <LinkSpanTag>
                    {linkPropsObject["placeholder_button_icon"].text || 'link'}
                </LinkSpanTag> */}
                {imagePosition === "after" && imageElement}
            </Link>
            );
        } else {
            console.log('items.href link: ' + getHref);
            // console.log('items.ariaLabel link: ' + getProps.ariaLabel);
            console.log('items.text link: ' + getProps.text);
            // console.log("getProps.text: " + getProps.text);
            // console.log("getProps.text: " + getHref);
            return (
                <Link 
                    id={id ? id : getProps.id}
                    className={`${className ? className : ''}${isActive ? ' active' : ''}`}
                    // href={getHref ? getHref : ' '}
                    href={`${getHref && getHref !== "undefined" && getHref !== null ? getHref : ''}`}
                    aria-label={getProps.ariaLabel}
                    rel={getProps.rel}
                    target={getProps.target}
                    role={role ? role : getProps.role}
                    onClick={anchorLink == true ? handleMultipleClickEvents : handleInternalClickEvent}
                    data-showbuffer={showBuffer == true ? "true" : ""}
                    // onLoad={handleLoad}
                    // data-showbuffer={"true"}
                >
                    {imagePosition === "before" && imageElement}
                    <SpanTag>
                        {getProps.text || 'Text'}
                    </SpanTag>
                    {/* <LinkSpanTag>
                        {getProps.text || ''}
                    </LinkSpanTag> */}
                    {imagePosition === "after" && imageElement}
                </Link>
            );
        }
        return linkComponent;
    } else {
        return null;
    }
}

// export function NavLink ({href, ariaLabel, id, children} : NavLinkProps) {

//     return (
//         <Link href={href} className={`${noto_sans.className} navLink`} id={id && id} role="link" aria-label={ariaLabel}>
//             <span>{children}</span>
//         </Link>
//     );
// }


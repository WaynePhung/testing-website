"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useDelayedLoad } from "@/app/hooks/use-delay-load";
import { useScrollToSection } from "@/app/utils/ts/anchorLinkScrollSpy";
import { DynamicMedia, ImageMedia } from "../media/media-content";
import { getLinkProps, LinkProps, SeeCaseStudyProps } from "./../../utils/ts/link-types";
import { locLinkProps } from "../list-of-contents/loc-link-props";
import { iconMediaProps } from "@/app/utils/ts/icon-props";
import checkDataBufferAttr from "./../../ui/buffer-page/check-data-buffer-attr";
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
    getHref?: string; // Changed from Url | string to just string
    anchorLink: boolean;
    isActive?: boolean;
    icon?: boolean;
    imagePosition?: string;
    role?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    showBuffer: boolean;
    placeholder?: boolean;
    children?: React.ReactNode;
}

type LinkComponentWithIcon = (LinkComponentProps & {icon: true; imagePosition: "before" | "after"});
type LinkComponentWithoutIcon = (LinkComponentProps & {icon: false; imagePosition?: "before" | "after" | undefined});

type LinkComponentCS = ((LinkComponentProps | LinkComponentWithIcon | LinkComponentWithoutIcon) & {group: "loc"; subgroup: string});
type LinkTypes = LinkComponentProps | LinkComponentWithIcon | LinkComponentWithoutIcon | LinkComponentCS;

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export function LinkComponent({ 
    group, subgroup, alias, className, id, page, getHref, anchorLink, isActive, icon, 
    imagePosition="", role, onClick, showBuffer, placeholder, children
}: LinkTypes): React.ReactElement | null {
    const pathname = usePathname();
    const router = useRouter();
    const { scrollToSection } = useScrollToSection();
    const { isLoaded, hasLoaded } = useDelayedLoad({ delay: 0 });

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (anchorLink && pathname === "/") {
            e.preventDefault();
            scrollToSection(getHref as string);
            if (onClick) {
                onClick(e);
            }
        } else if (!anchorLink) {
            const [getBuffer, href] = checkDataBufferAttr(e);
            if (getBuffer && href && showBuffer) {
                bpTransitionEffect(href);
                await delay(500);
                router.push(href);
            }
        } else if (onClick) {
            onClick(e);
        }
    };

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
                        getHref = typeof (getProps as LinkProps).href === "string" ? ("" + (getProps as LinkProps).href) : "";
                    }
                    getHref = typeof getHref === "string" ? getHref : "";
                    // console.log('getHref: ' + getHref);
                }
            }
            break;
        case("loc"):
            linkPropsObject = getMediaGroupObject(group, subgroup);
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
                    if (iconPropsObject && typeof iconPropsObject === 'object' && alias in iconPropsObject) {
                        const media = iconPropsObject[alias] as locLinkProps;
                        const iconProps = media.icon;
                        if (!isLoaded && !hasLoaded) {
                            imageElement = <FigureImageVideo group={"icon"} mediaAlias={"placeholder_button_icon"} wrappingLink={false} />
                        } else {
                            imageElement = <FigureImageVideo group={"loc"} subgroup={subgroup} mediaAlias={alias} wrappingLink={false} />
                        }
                    }
                } else {
                    iconPropsObject = iconMediaProps() as DynamicMedia;
                    function isImageMedia(media: DynamicMedia[keyof DynamicMedia]): media is ImageMedia {
                        return media.mediaType === 'image';
                    }
                    
                    if (iconPropsObject && typeof iconPropsObject === 'object' && alias in iconPropsObject) {
                        const media = iconPropsObject[alias];
                        if (isImageMedia(media)) {
                            // console.log('icon: ' + icon);
                            // console.log('getIconProps src: ' + media.src);
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
        return (
            <a 
                id={id || getProps.id}
                className={`${className || ''} ${isActive ? ' active' : ''}`}
                href={`${(getHref && getHref !== "undefined" && getHref !== null) && getHref}`}
                aria-label={getProps.ariaLabel}
                rel={getProps.rel}
                target={getProps.target}
                role={role || getProps.role}
                onClick={handleClick}
                data-showbuffer={showBuffer ? "true" : ""}
            >
                {imagePosition === "before" && imageElement}
                <SpanTag placeholder={placeholder}>
                    {('text' in getProps) ? getProps.text : children}
                </SpanTag>
                {imagePosition === "after" && imageElement}
            </a>
        );
    } else {
        return null;
    }
}
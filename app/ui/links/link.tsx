"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useDelayedLoad } from "@/app/hooks/use-delay-load";
import { useScrollToSection } from "@/app/utils/ts/anchorLinkScrollSpy";
import { getLinkProps, LinkProps, SeeCaseStudyProps } from "./../../utils/ts/link-types";
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
            scrollToSection(href as string);
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

    const getLinkPropsObject = () => {
        if (group === "link-global") {
            return getLinkProps(page);
        } else if (group === "loc" && subgroup) {
            return getMediaGroupObject(group, subgroup);
        }
        return null;
    };

    const linkPropsObject = getLinkPropsObject();
    if (!linkPropsObject) return null;

    // const getProps = linkPropsObject[alias] as LinkProps | SeeCaseStudyProps;
    let getProps, grabHref;
    if (group === "link-global") {
        console.log("group is link-global");
        getProps = linkPropsObject[alias];
        if (alias === "seeCaseStudy" && subgroup && typeof getProps === 'object' && 'href' in getProps) {
            const seeCaseStudyProps = getProps as SeeCaseStudyProps;
            if (subgroup in seeCaseStudyProps.href) {
                if (pathname === "/") {
                    grabHref = "" + seeCaseStudyProps.href[subgroup];
                } else {
                    grabHref = "/" + seeCaseStudyProps.href[subgroup];
                }
            } else {
                console.warn(`Subgroup "${subgroup}" not found in seeCaseStudy href object`);
                getHref = "/";
            }
        } else {
            grabHref = typeof (getProps as LinkProps).href === "string" ? ("" + (getProps as LinkProps).href) : "";
        }
        grabHref = typeof grabHref === "string" ? grabHref : "";
    } else if (group === "loc" && subgroup) {
        console.log("group is loc");
        getProps = linkPropsObject[alias] as locLinkProps;
        grabHref = "" + getProps.href;
    } else {
        // return null;
    }
    
    // let getProps;
    if (!getProps) {
        console.warn(`No navigation props found for group: ${group} and alias: ${alias}`);
        return null;
    }

    // const href = getHref || (typeof getProps.href === "string" ? getProps.href : "");
    console.log('grabHref: ' + grabHref);
    const href = (grabHref && grabHref !== "undefined" && grabHref !== null) && grabHref;

    console.log('href from getHref: ' + getHref);
    console.log('href from getProps.href: ' + getProps.href);
    console.log('href: ' + href);

    let imageElement;
    if (icon && icon == true) {
        if (!isLoaded && !hasLoaded) {
            imageElement = 
                <FigureImageVideo 
                    group={"icon"} 
                    mediaAlias={"placeholder_button_icon"} 
                    wrappingLink={false} 
                />
        } else {
            imageElement = (group === "loc" && subgroup) ? 
                <FigureImageVideo 
                    group={"loc"} 
                    subgroup={subgroup} 
                    mediaAlias={alias} 
                    wrappingLink={false} 
                /> 
            : 
                <FigureImageVideo 
                    group={"icon"} 
                    mediaAlias={alias} 
                    wrappingLink={false} 
                />
        }
    }

    return (
        <a 
            id={id || getProps.id}
            className={`${className || ''} ${isActive ? ' active' : ''}`}
            href={href}
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
}
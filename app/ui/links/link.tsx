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
        e.preventDefault();
        if (anchorLink && pathname === "/") {
            scrollToSection(getHref as string);
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

    const getProps = linkPropsObject[alias] as LinkProps | SeeCaseStudyProps;
    if (!getProps) {
        console.warn(`No navigation props found for group: ${group} and alias: ${alias}`);
        return null;
    }

    const href = getHref || (typeof getProps.href === "string" ? getProps.href : "");

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
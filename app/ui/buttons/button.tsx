import React, { useEffect, useRef, useState } from 'react';
import { getButtonProps } from "@/app/utils/ts/button-types";
import { LinkType, LinkComponent } from "../links/link";
import { toggleLoCDisplay } from "../list-of-contents/toggle-loc-mobile";

// interface ButtonType {
//     type: string;
//     caseStudy?: LinkType["caseStudy"];
//     imagePosition?: LinkType["imagePosition"]
//     // children: React.ReactNode;
// }

export default function ButtonComponent({type, caseStudy, imagePosition, onClick, showBuffer} : LinkType) : React.ReactElement | null {
    const 
        buttonPropsObject = getButtonProps(),
        getPropsHref = buttonPropsObject[type],
        targetRef = useRef<HTMLElement>(null),
        
        handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // if (pathname === "/" && anchorLink === "true") {
            if (type == "listOfContents" && targetRef.current) {
                event.preventDefault();
                toggleLoCDisplay(targetRef.current);
            } else {
                // Do nothing.
            }
        };
    return(
        <button
            className={getPropsHref.class}
            id={getPropsHref.id}
            role={getPropsHref.role}
            aria-label={getPropsHref.ariaLabel}
            onClick={onClick}
        >
            <LinkComponent 
                type={type} 
                caseStudy={caseStudy}
                imagePosition={imagePosition} 
                showBuffer={showBuffer}
            />
        </button>
    );
}
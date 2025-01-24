import React, { useEffect, useRef, useState } from 'react';
import { getButtonProps } from "@/app/utils/ts/button-types";
import { LinkComponentProps, LinkComponent } from "../links/link";
import { toggleLoCDisplay } from "../list-of-contents/toggle-loc-mobile";
import ButtonPlaceholder_NoIcon from "../placeholders/button-placeholder";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";

import { indefinite } from "@/app/utils/ts/exported-constants";

// interface ButtonType {
//     type: string;
//     caseStudy?: LinkType["caseStudy"];
//     imagePosition?: LinkType["imagePosition"]
//     // children: React.ReactNode;
// }

type ButtonComponentProps = LinkComponentProps & {
  buttonType: string, 
  icon?: boolean, 
  children?: React.ReactNode;
};

export default function ButtonComponent({group, subgroup, alias, anchorLink, imagePosition, onClick, showBuffer, buttonType, icon, children} : ButtonComponentProps): React.ReactElement | null {
    const { isLoaded, hasLoaded, handleLoad } = useDelayedLoad();
    
    const 
        buttonPropsObject = getButtonProps(),
        getPropsHref = buttonPropsObject[alias],
        targetRef = useRef<HTMLElement>(null),
        handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // if (pathname === "/" && anchorLink === "true") {
            if (group == "loc" && targetRef.current) {
                event.preventDefault();
                toggleLoCDisplay(targetRef.current);
            } else {
                // Do nothing.
            }
        };
    let classNamesString;
    if (!isLoaded && !hasLoaded) {
      // classNamesString = buttonPropsObject["placeholder_button_icon"].class;
      switch(buttonType) {
        case('primary'):
            classNamesString = 'button-primary' + buttonPropsObject["placeholder_button_icon"].class;
            break;
        case('secondary'):
            classNamesString = 'button-secondary' + buttonPropsObject["placeholder_button_icon"].class;
            break;
        default:
            break;
      }
      return (
        <button
              className={classNamesString}
              role={buttonPropsObject.placeholder_button_icon.role}
              aria-label={buttonPropsObject.placeholder_button_icon.ariaLabel}
              onLoad={handleLoad}
          >
          <LinkComponent 
              group={"link-global"} 
              alias={"placeholder_button_icon"} 
              anchorLink={anchorLink} 
              icon={icon} 
              imagePosition={imagePosition && imagePosition} 
              showBuffer={false}
          />
        </button>
      );
    } else {
      classNamesString = getPropsHref.class;
      switch(buttonType) {
        case('primary'):
            classNamesString += ' button-primary-loaded';
            break;
        case('secondary'):
            classNamesString += ' button-secondary-loaded';
            break;
        default:
            break;
      }
      return(
          <button
              className={`${classNamesString} fade-in`}
              id={getPropsHref.id}
              role={getPropsHref.role}
              aria-label={getPropsHref.ariaLabel}
              onClick={onClick}
              onLoad={handleLoad}
          >
            <LinkComponent 
                // group={group} 
                group={"link-global"} 
                subgroup={subgroup}
                alias={alias}
                anchorLink={anchorLink} 
                icon={icon}
                imagePosition={imagePosition} 
                showBuffer={showBuffer}
            >
              {children && children}
            </LinkComponent>
          </button>
      );
    }
}
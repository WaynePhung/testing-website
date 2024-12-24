import React, { useEffect, useRef, useState } from 'react';
import { getButtonProps } from "@/app/utils/ts/button-types";
import { LinkType, LinkComponent } from "../links/link";
import { toggleLoCDisplay } from "../list-of-contents/toggle-loc-mobile";
import ButtonPlaceholder_NoIcon from "../placeholders/button-placeholder";

// interface ButtonType {
//     type: string;
//     caseStudy?: LinkType["caseStudy"];
//     imagePosition?: LinkType["imagePosition"]
//     // children: React.ReactNode;
// }

export default function ButtonComponent({type, caseStudy, imagePosition, onClick, showBuffer} : LinkType) : React.ReactElement | null {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      // const loadedState = localStorage.getItem(`${mediaType}-${mediaAlias}-loaded`);
      setTimeout(() => {
          // if (loadedState === 'true') {
              setIsLoaded(true);
              // setHasLoaded(true);
          // }
        // }, 0); // 0 seconds for initial load
        // }, 5000); // 5 seconds delay
        // }, 60000); // 60 seconds for initial load
      }, 6000000000); // plenty of seconds for initial load
    });

    const handleLoad = () => {
      setTimeout(() => {
          setIsLoaded(true);
          // setHasLoaded(true);
          // localStorage.setItem(`${mediaType}-${mediaAlias}-loaded`, 'true');
      // }, 0); // 0 seconds for initial load
      // }, 5000); // 5 seconds delay
      // }, 60000); // 60 seconds for initial load
      }, 6000000000); // plenty of seconds for initial load
    };

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
    if (!isLoaded && !hasLoaded) {
      return (
        <button
              className={buttonPropsObject["placeholder_button_icon"].class}
              role={buttonPropsObject["placeholder_button_icon"].role}
              aria-label={buttonPropsObject["placeholder_button_icon"].ariaLabel}
              onLoad={handleLoad}
          >
          <LinkComponent 
              type={"placeholder_button_icon"} 
              imagePosition={imagePosition && imagePosition} 
              showBuffer={"false"}
          />
        </button>
      );
    } else {
      return(
          <button
              className={`${getPropsHref.class} fade-in`}
              id={getPropsHref.id}
              role={getPropsHref.role}
              aria-label={getPropsHref.ariaLabel}
              onClick={onClick}
              onLoad={handleLoad}
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
}
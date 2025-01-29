"use client";

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";
import adjustFooterBottomPadding from "@/app/utils/ts/footer-bottom-padding";

export function GlobalNavComponents() {
    const pathname = usePathname();
    // const hash = window.location.hash;
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    let pageString;
    if (pathname === '/') {
        pageString = "home";
    } else {
        pageString = "global";
    }

    useEffect(() => {

        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth >= 825) {
                setIsOpen(false);
            }
        };
        
        // Event listeners
        window.addEventListener('resize', handleResize);

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // useEffect(() => {
    //     console.log('DOM structure:', document.body.innerHTML);
    //     if (typeof window !== 'undefined') {
    //     console.log('window width - get inner width: ' + window.innerWidth);

    //     function handleFooterBottomPadding() {
    //         setWindowWidth(window.innerWidth);
    //         if (window.innerWidth < 1024) {
    //         adjustFooterBottomPadding();
    //         } else {
    //         const footer = document.querySelector('footer');
    //         if (footer) {
    //             footer.style.paddingBottom = '';
    //         }
    //         }
    //     }

    //     // const handleInitialSetup = () => {
    //     //   handleFooterBottomPadding();
    //     // };
        
    //     const handleResize = () => {
    //         if (window.innerWidth >= 825) {
    //             setIsOpen(false);
    //         }
    //         handleFooterBottomPadding();
    //     };

    //     // handleInitialSetup();
    //     handleFooterBottomPadding();
    //     // Event listeners
    //     window.addEventListener('resize', handleResize);

    //     // Clean up function
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    //     }
    // }, []);

    const toggleNav = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const mobileNavContainer = 
    ((windowWidth && windowWidth < 825) && isOpen) && 
    <nav className="open-mobile-nav">
      <LinkComponent 
          group="link-global"
          alias="design" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          onClick={toggleNav}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="media" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          onClick={toggleNav}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="about" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          onClick={toggleNav}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="timeline" 
          anchorLink={pageString == "home" ? true : false}
          onClick={toggleNav}
          showBuffer={pageString == "home" ? false : true}
      />
      <hr></hr>
      
    </nav>
  ;

  const wpLink = 
    <LinkComponent 
        group="link-global"
        alias="home" 
        anchorLink={false}
        showBuffer={pageString == "home" ? false : true}
    />
  ;

  let menuButton;
  if (windowWidth && windowWidth < 825) {
    menuButton = 
      isOpen ? 
        <ButtonComponent 
          group="link-global"
          alias="closeMenu" 
          anchorLink={false}
          icon={true}
          imagePosition="after"
          onClick={toggleNav}
          showBuffer={false}
          buttonType="secondary" 
      />
      : 
      <ButtonComponent 
          group="link-global"
          alias="menu" 
          anchorLink={false}
          icon={true}
          imagePosition="after"
          onClick={toggleNav}
          showBuffer={false}
          buttonType="secondary" 
      />
    ;
  }

  const desktopNavContainer = 
    (windowWidth && windowWidth >= 825) && 
    <nav className="anchorLinks" role="anchorLinks" aria-label="group of main mavigation links">
      <LinkComponent 
          group="link-global"
          alias="design" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="media" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="about" 
          page={pageString == "home" ?  "home" : "global"} 
          anchorLink={pageString == "home" ? true : false}
          showBuffer={pageString == "home" ? false : true}
      />
      <LinkComponent 
          group="link-global"
          alias="timeline" 
          anchorLink={pageString == "home" ? true : false}
          showBuffer={pageString == "home" ? false : true}
      />
    </nav>
  ;

  const contactButton = 
    (windowWidth && windowWidth >= 825 && windowWidth < 1024) && 
    <ButtonComponent 
        group="link-global"
        alias="contact" 
        anchorLink={false}
        icon={false}
        showBuffer={false}
        buttonType="primary" 
    />
  ;

  const smButtons = 
    (windowWidth && windowWidth >= 1024) && 
    <div className="contactButtons">
      <ButtonComponent 
          group="link-global"
          alias="linkedIn" 
          anchorLink={false}
          icon={true} 
          imagePosition="before" 
          showBuffer={false}
          buttonType="primary" 
      />
      <ButtonComponent 
          group="link-global"
          alias="email" 
          anchorLink={false}
          icon={true} 
          imagePosition="before" 
          showBuffer={false}
          buttonType="primary" 
      />
    </div>
  ;

    return (
        /* navigation tab: Container for all of the buttons, but not the progress bar. */
        <nav role="navigation" aria-label="group of navigation links">
            {mobileNavContainer}
            {wpLink}
            {menuButton}
            {desktopNavContainer}
            {contactButton}
            {smButtons}
        </nav>
    );
}
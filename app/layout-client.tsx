"use client";

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LinkComponent } from "./ui/links/link";
import ButtonComponent from "./ui/buttons/button";
import Header from "./ui/header/header";
import Footer from "./ui/footer/footer";
import { handleLoC } from "./utils/ts/loc-styling";
import { useHeaderFooterRefs } from "./utils/ts/header-footer-refs";
import adjustFooterBottomPadding from "./utils/ts/footer-bottom-padding";
import { setupAutoplayVideoHandler } from "./utils/ts/autoplay-video-handler";
import { adjustNavChildWidth } from "./utils/ts/adjustNavChildWidth";
import { initializeH2SectionBounds, updateH2SectionBounds, setupStickyH2, onRouteChange } from "./utils/ts/checkBound-H2Section";
import { setActiveLink } from "./utils/ts/active-link-styling";
import Loading from "./loading";
import changeBPText from "./ui/buffer-page/change-bp-text";
import bpTransitionEffect from "./ui/buffer-page/bp-transition-effect";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error/error";

interface LayoutProps {
  // pageString?: "home" | "global";
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  // pageString,
  children
}) => {
  // const [headerHeight, setHeaderHeight] = useState<number>(0);
  const contentRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const { headerRef, footerRef } = useHeaderFooterRefs();
  // const headerRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const { setupObserver, cleanupObserver } = setupAutoplayVideoHandler(contentRef);
  const pathname = usePathname();
  const [isHeaderMounted, setIsHeaderMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  let pageString;
  if (pathname === '/') {
      pageString = "home";
  } else {
      pageString = "global";
  }
  // console.log('pageString: ' + pageString);

  function bpTransition (pathname: string) {
    let fullPath = window.location.pathname + window.location.hash;
    bpTransitionEffect(fullPath ? fullPath : pathname);
  }

  const handleRouteChange = useCallback(() => {
    setActiveLink(pathname, pathname, false); // Reset active link on route change
    initializeH2SectionBounds(pathname);
    onRouteChange(pathname);
    setupStickyH2(pathname);
    setIsHeaderMounted(true);    
    bpTransition(pathname);
    changeBPText(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleUnload = () => {
      bpTransition(pathname);
    };
    const handleLoad = () => {
      bpTransition(pathname);
    };
    window.addEventListener('unload', handleUnload);
    window.addEventListener('load', handleLoad);
    // Clean up function
    return () => {
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [pathname, handleRouteChange]);

  useLayoutEffect(() => {
    // console.log('DOM structure:', document.body.innerHTML);
    if (typeof window !== 'undefined') {
      // console.log('window width - get inner width: ' + window.innerWidth);

      setWindowWidth(window.innerWidth);
      function handleFooterBottomPadding() {
        setWindowWidth(window.innerWidth);
        // console.log('Header structure:', headerRef.current);
        // console.log('Footer structure:', footerRef.current);
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (window.innerWidth < 1024 && header && footer) {
          setTimeout(() => {
            adjustFooterBottomPadding(header, footer);
          }, 1);
        // if (window.innerWidth < 1024 && headerRef.current && footerRef.current) {
        //   adjustFooterBottomPadding(headerRef.current, footerRef.current);
        } else {
          const footer = document.querySelector('footer');
          if (footer) {
            footer.style.paddingBottom = '';
          }
        }
        // if (window.innerWidth < 1024) {
        // } else {
        //   const footer = document.querySelector('footer');
        //   if (footer) {
        //     footer.style.paddingBottom = '';
        //   }
        // }
      }

      // Run this constant when the page loads.
      const handleInitialSetup = () => {
        setWindowWidth(window.innerWidth);
        //The 1 ms delay below is important, otherwise the code won't properly calibrate the bottom padding of the footer (with no delay, the footer will be accidentally hidden from the header on smaller screen widths).
        handleFooterBottomPadding();
      };
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 825) {
            setIsOpen(false);
        }
        handleFooterBottomPadding();
      };

      handleInitialSetup();
      
      // Event listeners
      window.addEventListener('resize', handleResize);

      // Clean up function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  //   if (typeof window !== 'undefined') {
  //     // console.log('window width - get inner width: ' + window.innerWidth);
  //     setWindowWidth(window.innerWidth);
  //     // console.log('windowWidth: ' + windowWidth);
  //     if (windowWidth) {
  //       function handleFooterBottomPadding() {
  //         if (windowWidth && windowWidth >= 1024) {
  //           adjustFooterBottomPadding();
  //         } else {
  //           const footer = document.querySelector('footer');
  //           if (footer) {
  //             footer.style.paddingBottom = '';
  //           }
  //         }
  //       }
  //       const handleInitialSetup = () => {
  //         console.log('window width - get state width: ' + windowWidth);
  //         handleFooterBottomPadding();
  //       };

  //       const handleContentLoaded = () => {
  //         console.log('Page content fully loaded');
  //         handleFooterBottomPadding();
  //       };

  //       const handleResize = () => {
  //         setWindowWidth(window.innerWidth);
  //         console.log('window width: ' + windowWidth);
  //         if (windowWidth >= 825) {
  //             setIsOpen(false);
  //         }
  //         handleFooterBottomPadding();
  //       };

  //       const handleScroll = () => {
  //         setupObserver();
  //         setupStickyH2(pathname);
  //       };

  //       // Initial setup
  //       // console.log('window width - get inner width: ' + window.innerWidth);
  //       setWindowWidth(window.innerWidth);
  //       // console.log('window width - get state width: ' + windowWidth);
  //       handleInitialSetup();

  //       if (document.readyState === 'complete') {
  //         handleContentLoaded();
  //       } else {
  //         const loadHandler = () => {
  //           if (document.readyState === 'complete') {
  //             console.log('Document is complete. Running handleContentLoaded.');
  //             handleContentLoaded();
  //             document.removeEventListener('readystatechange', loadHandler);
  //           }
  //         };
  //         document.addEventListener('readystatechange', loadHandler);
  //         return () => {
  //           document.removeEventListener('readystatechange', loadHandler);
  //         };
  //       }
        
  //       // Event listeners
  //       window.addEventListener('resize', handleResize);
  //       window.addEventListener('scroll', handleScroll);

  //       // Clean up function
  //       return () => {
  //         cleanupObserver();
  //         window.removeEventListener('resize', handleResize);
  //         window.removeEventListener('scroll', handleScroll);
  //       };
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const handleInitialSetup = () => {
        handleLoC(contentRef);
        initializeH2SectionBounds(pathname);
        onRouteChange(pathname);
        setupStickyH2(pathname);
        setupObserver();
        adjustNavChildWidth();
        setActiveLink(pathname, pathname, false); // Reset active link on initial load
        setIsOpen(false);
      };

      const handleResize = () => {
        // measureHeaderHeight();
        // adjustFooterBottomPadding();
        handleLoC(contentRef);
        setupObserver();
        adjustNavChildWidth();
        setupStickyH2(pathname);
        setWindowWidth(window.innerWidth);
        console.log('window width: ' + windowWidth);
        if (windowWidth && windowWidth >= 825) {
            setIsOpen(false);
        }
      };

      // Initial setup
      // console.log('window width - get inner width: ' + window.innerWidth);
      setWindowWidth(window.innerWidth);
      // console.log('window width - get state width: ' + windowWidth);
      handleInitialSetup();
      // console.log('DOM structure:', document.body.innerHTML);

      const handleScroll = () => {
        setupObserver();
        setupStickyH2(pathname);
      };

      // Event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      // Clean up function
      return () => {
        cleanupObserver();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
      // if (windowWidth) {
      // }
    }
  }, [pathname, handleRouteChange]);

  // This effect will run on route changes
  useEffect(() => {
    handleRouteChange();
  }, [pathname, handleRouteChange]);

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
    <>
      <ErrorBoundary errorComponent={Error}>
        {/* <Suspense fallback={<Loading />}> */}
          {/* <main ref={contentRef} id="top-of-page"> */}
          <Header ref={headerRef} />
          <main ref={contentRef} id="top-of-page">
            {children}
          </main>
          <Footer ref={footerRef} />
          <Loading />
        {/* </Suspense> */}
      </ErrorBoundary>
    </>
  );
};

export default Layout;

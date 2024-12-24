"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';
import DefaultHeader from "./ui/header/header";
import Footer from "./ui/footer/footer";
import { handleLoC } from "./utils/ts/loc-styling";
import adjustFooterBottomPadding from "./utils/js/footer";
import { setupAutoplayVideoHandler } from "./utils/ts/autoplay-video-handler";
import { adjustNavChildWidth } from "./utils/ts/adjustNavChildWidth";
import { initializeH2SectionBounds, updateH2SectionBounds, setupStickyH2, onRouteChange } from "./utils/ts/checkBound-H2Section";
import { setActiveLink } from "./utils/ts/active-link-styling";
// import Loading from "./ui/buffer-page/buffer-page";
import Loading from "./loading";
import changeBPText from "./ui/buffer-page/change-bp-text";
import bpTransitionEffect from "./ui/buffer-page/bp-transition-effect";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error/error";
import { SafeHTML } from "./ui/text/safe-html";
import path from "path";

const LoadingScreen = () => (
  <div className="loading-screen">
    <h1>Loading...</h1>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  // const contentRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const { setupObserver, cleanupObserver } = setupAutoplayVideoHandler(contentRef);
  const pathname = usePathname();
  // const [pathname, setPathname] = useState(currentPathname);
  // const [fullPath, setFullPath] = useState<string>(window.location.pathname + window.location.hash || '');
  const [pageString, setPageString] = useState(pathname == "/" ? "home" : "global");
  // const pathname = usePathname();

  // const [fullPath, setFullPath] = useState<string>(window.location.pathname + window.location.hash || '');

  // useEffect(() => {
  //   setFullPath(window.location.pathname + window.location.hash);
  // }, []);

  // let changedText = changeBPText(pathname);

  function bpTransition (pathname: string) {
    let fullPath = window.location.pathname + window.location.hash;
    bpTransitionEffect(fullPath ? fullPath : pathname);
  }

  const handleRouteChange = useCallback(() => {
    setActiveLink(pathname, pathname, false); // Reset active link on route change
    initializeH2SectionBounds(pathname);
    onRouteChange(pathname);
    setupStickyH2(pathname);
    adjustFooterBottomPadding();
    // setFullPath(window.location.pathname + window.location.hash);
    // const router = useRouter();
    // router.events.on('routeChangeComplete', handleRouteChange);
  
    //   return () => {
    //     router.events.off('routeChangeComplete', handleRouteChange);
    //   };
    
    bpTransition(pathname);
    changeBPText(pathname);
    setPageString(pathname);
    // console.log('layout-client.tsx - fullPath: ' + fullPath);
    return (
      <>
        <ErrorBoundary errorComponent={Error}>
          <Suspense fallback={<Loading />}>
            <Loading>
              <DefaultHeader />
              <main ref={contentRef} id="top-of-page">
                {children}
              </main>
              <Footer />
            </Loading>
          </Suspense>
        </ErrorBoundary>
      </>
    );
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

  // useEffect(() => {
  //   const getBuffer = document.querySelector("aside.buffer-page");
  //   const getHref = pathname;
  //   if (getBuffer && getHref) {
  //     const getH1 = getBuffer.querySelector("h1");
  //     if (getH1) {
  //         let changedText = "viewing page...";
  //         console.log('gHref for buffer text: ' + getHref);
  //         switch(getHref) {
  //             case "/":
  //                 changedText = "viewing home page...";
  //                 break;
  //             case "/#design-work":
  //                 changedText = "viewing design work...";
  //                 break;
  //             case "/#media-work":
  //                 changedText = "viewing media work...";
  //                 break;
  //             case "/#about-me":
  //                 changedText = "about me...";
  //                 break;
  //             case "/electric-stride":
  //                 changedText = "viewing the Electric Stride case study...";
  //                 break;
  //             case "/triton-television-reel":
  //                 changedText = "viewing the TTV Reel case study...";
  //                 break;
  //             default:
  //                 // No default action
  //         }
  //         getH1.textContent = changedText;
  //         }
  //   }
  //   if (getBuffer != null) {
  //     getBuffer.classList.add("visible");
  //     setTimeout(() => {
  //       getBuffer.classList.remove("visible");
  //     }, 1000);
  //   }
  // }, [pathname]);

  useEffect(() => {
    const measureHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement instanceof HTMLElement) {
        setHeaderHeight(headerElement.offsetHeight);
      } else {
        setHeaderHeight(60); // Fallback arbitrary value
      }
    };

    const handleInitialSetup = () => {
      measureHeaderHeight();
      handleLoC(contentRef);
      initializeH2SectionBounds(pathname);
      onRouteChange(pathname);
      setupStickyH2(pathname);
      adjustFooterBottomPadding();
      setupObserver();
      adjustNavChildWidth();
      setActiveLink(pathname, pathname, false); // Reset active link on initial load
    };

    const handleResize = () => {
      measureHeaderHeight();
      adjustFooterBottomPadding();
      handleLoC(contentRef);
      setupObserver();
      adjustNavChildWidth();
      setupStickyH2(pathname);
    };

    const handleScroll = () => {
      setupObserver();
      setupStickyH2(pathname);
    };

    // Initial setup
    handleInitialSetup();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => {
      cleanupObserver();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, handleRouteChange]);

  // This effect will run on route changes
  useEffect(() => {
    handleRouteChange();
  }, [pathname, handleRouteChange]);

  return (
    <>
      <ErrorBoundary errorComponent={Error}>
        {/* <Suspense fallback={<Loading />}> */}
            <DefaultHeader />
            <main ref={contentRef} id="top-of-page">
              {children}
            </main>
            <Footer />
          <Loading>
          </Loading>
        {/* </Suspense> */}
      </ErrorBoundary>
    </>
  );
};

export default Layout;

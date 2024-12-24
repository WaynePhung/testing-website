'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import Script from "next/script";

import Link from "next/link";
import { literata, noto_sans } from "../../utils/text-styling/fonts";
import NavBarHome from "./nav-bar-home-old-01";
// import TitleContainerDefault from "./ui/section-containers/title-container-default";
import "./../page.css";
// import DynamicScriptLoader from "./dynamic-script-loader/dynamic-script-loader";
// import Script from "next/script";
import Footer from "../footer/footer";
import * as aFBM from "../../utils/js/footer";
import * as cSH2 from "../../utils/js/scroll-to-h2-main";

import ElectricStride from "./electric-stride";
import AutoPG from "./automation-playground";
import TTVReel from "./triton-television-reel";
import TCLCVideo from "./tclc-video";
import javascript from "../../utils/js/global-layout";

import dynamic from "next/dynamic";
// import adjustFooterBottomPadding from "../utils/js/footer";

// function reloadCSS(href: string) {
//     const pathname = usePathname();
  
//     useEffect(() => {
//       const handleRouteChange = () => {
//         const existingLink = document.querySelector(`link[href="${href}"]`);
//         if (existingLink) {
//           existingLink.remove();
//         }
//         const newLink = document.createElement('link');
//         newLink.rel = 'stylesheet';
//         newLink.href = href;
//         document.head.appendChild(newLink);
//       }
  
//       handleRouteChange(); // Initial load
//     }, [pathname, href])
//   }

// function reloadScript(src: string) {
//     const pathname = usePathname();
  
//     useEffect(() => {
//       const handleRouteChange = () => {
//         const existingScript = document.querySelector(`script[src="${src}"][type="module"]`);
//         if (existingScript) {
//           existingScript.remove();
//         }
//         const newScript = document.createElement('script');
//         newScript.type = 'module';
//         newScript.src = src;
//         document.body.appendChild(newScript);
//       }
  
//       handleRouteChange(); // Initial load
//     }, [pathname, src]);
//   }

export default function HomePageContent() {
    // reloadCSS("./page.css");
    // javascript();
    // reloadScript("/app/utils/js/global-layout.js");
  //   window.addEventListener ('resize', function() {
  //     // console.log("screen width: " + window.innerWidth);
  //     if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
  //       aFBM.adjustFooterBottomPadding();
  //     } else {
  //         // console.log('Resetting footer bottom margin.');
  //         aFBM.footer.style.marginBottom = '';
  //     }
  //     cSH2.changeStickyH2();
  // });
    const Dynamic = dynamic(() => import("../../utils/js/global-layout"), {
      ssr: false
    });
    return (
    <>
        {/* <Head>
            <link rel="stylesheet" href="./page.css" />
        </Head> */}
        {/* <DynamicScriptLoader /> */}
        <NavBarHome />
        <main>
        <section id="title">
            <h1 className={literata.className}>Wayne Phung</h1>
            <p className={noto_sans.className}>
            <b>My last role:</b> small academic group at the University of California - San Diego
            <br/>
            worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </p>
        </section>
        <section className="work-previews" id="design-work">
            <h2 className={`${literata.className} h2-sticky`}>Design Work</h2>
            <article>
            <ElectricStride />
            <AutoPG />
            </article>
        </section>
        <section className="work-previews" id="media-work">
            <h2 className={`${literata.className} h2-sticky`}>Media Work</h2>
            <article>
            <TTVReel />
            <TCLCVideo />
            </article>
        </section>
        </main>
        <Footer />
        <Dynamic />
        {/* <Script 
        type="module" 
        src="./../utils/js/global-layout.js"
        strategy="beforeInteractive"
        // onLoad={() => {
        //   javascript();
        // }}
        /> */}
        {/* <script 
        type="module" 
        src="./js/global-layout.js"
        ></script> */}
    </>
    );
}

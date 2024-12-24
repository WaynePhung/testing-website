'use client';

// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
// import Head from 'next/head';

import Link from "next/link";
import { literata, noto_sans } from "../../utils/text-styling/fonts";
import NavBarHome from "./nav-bar-home-old-01";
import NavigationHandler from "../../_unused pages/script-handler";
// import TitleContainerDefault from "./ui/section-containers/title-container-default";
import "./../../page.css";
import Script from "next/script";
import Footer from "../footer/footer";

import ElectricStride from "./electric-stride";
import AutoPG from "./automation-playground";
import TTVReel from "./triton-television-reel";
import TCLCVideo from "./tclc-video";

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
//         newScript.src = src;
//         newScript.type = 'module';
//         document.body.appendChild(newScript);
//       }
  
//       handleRouteChange(); // Initial load
//     }, [pathname, src]);
//   }

export default function ESContent() {
    // reloadCSS("./../../page.css");
    // reloadScript("./js/global-layout.js");
    return (
    <>
        {/* <Head>
            <link rel="stylesheet" href="./../../page.css" />
        </Head> */}
        <NavigationHandler />
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
        <Script 
        type="module" 
        src="./js/global-layout.js"
        strategy="beforeInteractive"
        />
        {/* <script 
        type="module" 
        src="./js/global-layout.js"
        ></script> */}
    </>
    );
}

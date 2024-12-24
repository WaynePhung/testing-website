'use client';

import { useState } from 'react';
import React, { useEffect, useRef } from 'react';
// import dynamic from "next/dynamic";
import Link from "next/link";
import { literata, noto_sans } from "../../utils/text-styling/fonts";
// import NavBarHome from "../../utils/ts/nav-bar";
import "@/app/page.css"
import Footer from "../footer/footer";
import Script from "next/script";

import ElectricStride from "./electric-stride";
import AutoPG from "./automation-playground";
import TTVReel from "./triton-television-reel";
import TCLCVideo from "./tclc-video";
import adjustFooterBottomPadding from "@/app/utils/js/footer";
import javascript from "@/app/utils/js/global-layout";

export default function HomePageContent() {
    // const DynamicScript = dynamic(() => import("../../utils/js/global-layout"), {ssr: false});
    const headerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (headerRef.current) {
        const getHeader = headerRef.current as HTMLDivElement;
        getHeader.style.backgroundColor = 'lightblue'
      }
      // var 
      //   main = document.querySelector('main'),
      //   titleSection = document.getElementById('title'),
      //   h2Headings = document.querySelectorAll('main h2'),
      //   headerHeight = NavBarHome.height;
    }, []);
    return (
    <>
      {/* <NavBarHome ref={headerRef} /> */}
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
            <h2 className={literata.className}>Design Work</h2>
            <article>
            <ElectricStride />
            <AutoPG />
            </article>
        </section>
        <section className="work-previews" id="media-work">
            <h2 className={literata.className}>Media Work</h2>
            <article>
            <TTVReel />
            <TCLCVideo />
            </article>
        </section>
      </main>
      <Footer />
      {/* <DynamicScript /> */}
      {/* <Script 
        type="module"
        src="/utils/js/global-layout.js"
        strategy="beforeInteractive"
        onReady={
          javascript
        }
      /> */}
    </>
    );
}

'use client';

import dynamic from "next/dynamic";
import Link from "next/link";
import ButtonComponent from "@/app/ui/buttons/button";
import TableofContents from "../list-of-contents/list-of-contents";
import { literata, noto_sans } from "../../utils/text-styling/fonts";
import { CSPComponent } from "../../(case study)/case-study-preview";
import FigureImageVideo from "@/app/ui/media/media-global";
import "@/app/page.css"

import ElectricStride from "@/app/ui/_unused components/electric-stride";
import AutoPG from "@/app/ui/_unused components/automation-playground";
import TTVReel from "@/app/ui/_unused components/triton-television-reel";
import TCLCVideo from "@/app/ui/_unused components/tclc-video";

export default function ESContent() {
  // const DynamicScript = dynamic(() => import("../../utils/js/global-layout"), {ssr: false});
    return (
      <>
        <section className="title">
            <h1 className={literata.className}>Electric Stride</h1>
            <p className={noto_sans.className}>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </p>
            {/* <ButtonComponent type="tableOfContents" imagePosition="before"></ButtonComponent> */}
        </section>
        <section className="bodyContent">
            <section className="content-loc">
              <article id="introduction">
                <h2 className={literata.className}>Introduction</h2>
                <p className={noto_sans.className}>Testing paragraph.</p>
                <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="placeholder" shadow="true"></FigureImageVideo>
                <FigureImageVideo mediaGroup="es" mediaType="video" mediaAlias="placeholderVideo" shadow="true"></FigureImageVideo>
              </article>
              <article id="other-case-studies">
                <h2 className={literata.className}>Other Case Studies</h2>
                <CSPComponent type="ap" shadow="false"/>
                <CSPComponent type="ttvReel" shadow="true" />
                <CSPComponent type="tclc" shadow="true" />
              </article>
            </section>
            <TableofContents caseStudy="electricStride"></TableofContents>
        </section>
      </>
    );
}

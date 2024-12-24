'use client';

import Link from "next/link";
import ButtonComponent from "@/app/ui/buttons/button";
import ListOfContents from "../../ui/list-of-contents/list-of-contents";
import { H2Tag, PTag } from "./../../ui/text/text-tags";
import { CSPComponent } from "../case-study-preview";
import FigureImageVideo from "@/app/ui/media/media-global";
import TitleSection from "@/app/ui/title-container/title-container-default";

export default function TTVReelContent() {
  return (
    <>
      <TitleSection pageType="ttvReel" />
      <section className="bodyContent">
        <section className="content-loc">
          <article id="introduction">
            <H2Tag>Introduction</H2Tag>
            <PTag>Testing paragraph.</PTag>
            <article className="grid-default-2c-equalWidth-1400">
              <FigureImageVideo mediaGroup="ttvReel" mediaType="video" mediaAlias="placeholderVideo1" shadow="true"></FigureImageVideo>
              <FigureImageVideo mediaGroup="ttvReel" mediaType="video" mediaAlias="placeholderVideo2" shadow="true"></FigureImageVideo>
            </article>
            {/* <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="placeholder" shadow="true"></FigureImageVideo>
            <FigureImageVideo mediaGroup="es" mediaType="video" mediaAlias="placeholderVideo" shadow="true"></FigureImageVideo> */}
          </article>
          <article id="other-case-studies">
            <H2Tag>Other Case Studies</H2Tag>
            <CSPComponent type="es" shadow="true" />
            <CSPComponent type="ap" shadow="false"/>
            <CSPComponent type="tclc" shadow="true" />
          </article>
        </section>
        <ListOfContents caseStudy="ttvReel"></ListOfContents>
      </section>
    </>
  );
}

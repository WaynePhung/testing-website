'use client';

import Link from "next/link";
import ButtonComponent from "@/app/ui/buttons/button";
import ListOfContents from "../../ui/list-of-contents/list-of-contents";
import { H2Tag, PTag } from "./../../ui/text/text-tags";
import { CSPComponent } from "./../../(case study)/case-study-preview";
import FigureImageVideo from "@/app/ui/media/media-global";
import TitleSection from "@/app/ui/title-container/title-container-default";

export default function ESContent() {
  return (
    <>
      <TitleSection pageType="es" />
      <section className="bodyContent">
        <section className="content-loc">
          <article id="introduction">
            <H2Tag>Introduction</H2Tag>
            <PTag>Testing paragraph.</PTag>
            <CSPComponent type="ap" shadow="false"/>
            <CSPComponent type="ttvReel" shadow="true" />
            <CSPComponent type="tclc" shadow="true" />
            {/* <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="placeholder" shadow="true"></FigureImageVideo>
            <FigureImageVideo mediaGroup="es" mediaType="video" mediaAlias="placeholderVideo" shadow="true"></FigureImageVideo> */}
          </article>
          <article id="other-case-studies">
            <H2Tag>Other Case Studies</H2Tag>
            <CSPComponent type="ap" shadow="false"/>
            <CSPComponent type="ttvReel" shadow="true" />
            <CSPComponent type="tclc" shadow="true" />
          </article>
        </section>
        <ListOfContents caseStudy="electric-stride"></ListOfContents>
      </section>
    </>
  );
}

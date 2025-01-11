'use client';

import Link from "next/link";
import ButtonComponent from "@/app/ui/buttons/button-test";
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
              <FigureImageVideo group="case-study" subgroup="ttvReel" mediaAlias="placeholderVideo1" wrappingLink={false}></FigureImageVideo>
              <FigureImageVideo group="case-study" subgroup="ttvReel" mediaAlias="placeholderVideo2" wrappingLink={false}></FigureImageVideo>
            </article>
            {/* <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="placeholder" shadow="true"></FigureImageVideo>
            <FigureImageVideo mediaGroup="es" mediaType="video" mediaAlias="placeholderVideo" shadow="true"></FigureImageVideo> */}
          </article>
          <article id="other-case-studies">
            <H2Tag>Other Case Studies</H2Tag>
            <CSPComponent subgroup="es" visualAlias="main" />
            <CSPComponent subgroup="ap" visualAlias="main" />
            <CSPComponent subgroup="tclc" visualAlias="finalDraft" />
          </article>
        </section>
        <ListOfContents caseStudy="ttvReel"></ListOfContents>
      </section>
    </>
  );
}

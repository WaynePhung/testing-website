"use client";

import TitleSection from "../ui/title-container/title-container-default";
import ButtonComponent from "../ui/buttons/button";
import { H2Tag, H1Tag, PTag } from "../ui/text/text-tags";
import { CSPComponent } from "./../(case study)/case-study-preview";

export default function ErrorPage() {
    return (
      <>
      {/* <section className="title-error">
        <article id="error-message">
          <H1Tag>The page or file that you are looking for doesn't exist.</H1Tag>
          <ButtonComponent type="homepage" showBuffer="true"></ButtonComponent>
        </article>
      </section> */}
      <TitleSection pageType="error">
        {/* <H1Tag>The page or file that you are looking for doesn't exist.</H1Tag> */}
        <ButtonComponent type="homepage" showBuffer="true"></ButtonComponent>
      </ TitleSection>
      <section className="bodyContent">
        <article id="other-case-studies">
          <H2Tag>Other Case Studies</H2Tag>
          <CSPComponent type="es" shadow="true" />
          <CSPComponent type="ap" shadow="false"/>
          <CSPComponent type="ttvReel" shadow="true" />
          <CSPComponent type="tclc" shadow="true" />
        </article>
      </section>
      </>
    );
  }
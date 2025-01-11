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
        <ButtonComponent 
          group="link-global"
          alias="homepage" 
          anchorLink={false}
          showBuffer={true} 
          buttonType="primary" 
        />
      </ TitleSection>
      <section className="bodyContent">
        <article id="other-case-studies">
          <H2Tag>Other Case Studies</H2Tag>
          <CSPComponent subgroup="es" visualAlias="main" />
          <CSPComponent subgroup="ap" visualAlias="main" />
          <CSPComponent subgroup="ttvReel" visualAlias="finalDraft" />
          <CSPComponent subgroup="tclc" visualAlias="finalDraft" />
        </article>
      </section>
      </>
    );
  }
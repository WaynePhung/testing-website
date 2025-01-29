import { H1Tag, PTag } from "../text/text-tags";
import FigureImageVideo from "@/app/ui/media/media-global";
import { caseStudyPreviews } from "@/app/(case study)/case-study-preview-content";
import { titleContainerContent } from "./title-container-props";
import { SafeHTML } from "@/app/ui/text/safe-html";
import { caseStudyPaths, otherPagePaths, pageCodes } from "@/app/utils/ts/exported-constants";

interface Page {
  pageType: string;
  children?: React.ReactNode;
}

export default function TitleSection({pageType, children} : Page) : React.ReactElement | null {
  let getFunction, getCSProps;
  if (pageCodes.includes(pageType)) {
    getFunction = caseStudyPreviews();
  } else if (otherPagePaths.includes(pageType)) {
    getFunction = titleContainerContent();
  } else {
    getFunction = titleContainerContent();
  }
  // if (getFunction) {
  getCSProps = getFunction[pageType];
  // }
  // console.log('title-container-default.tsx - getFunction: ' + getFunction + ' getCSProps: ' + getCSProps);
  let getMediaAlias, getMediaType;
    // console.log('getESProps: ' + JSON.stringify(getCSProps));
  switch (pageType) {
    case ("es"):
      getMediaAlias = "main";
      getMediaType = "image";
      break;
    case ("ttvReel"):
      getMediaAlias = "finalDraft";
      getMediaType = "iframe";
      break;
    default:
      // Nothing is rendered.
      getMediaAlias = "";
      getMediaType = "";
      break;
  }
  return(
    <section className={pageCodes.includes(pageType) || otherPagePaths.includes(pageType) ? "title" : "title-error"}>
      <article>
        <H1Tag>{getCSProps.title}</H1Tag>
        <PTag>
          <SafeHTML html={getCSProps.spiel} />
          {/* {getCSProps.spiel} */}
        </PTag>
        {children && children}
      </article>
      {
        (pageType && getMediaType && getMediaAlias) && 
        <FigureImageVideo group={"case-study"} subgroup={pageType} mediaAlias={getMediaAlias} wrappingLink={false}/>
      }
      {/* <ButtonComponent type="listOfContents" imagePosition="before"></ButtonComponent> */}
  </section>
  );
}
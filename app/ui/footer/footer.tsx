import { H3Tag, H4Tag, PTag, SubtitleTag } from "./../../ui/text/text-tags";
import { noto_sans } from "../../utils/text-styling/fonts";
import Link from "next/link";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
// import Button_LinkedIn from "../buttons/button-linkedIn";
// import Button_Email from "../buttons/button-email";

interface Footer {
    pageString?: "home" | "global";
}

export default function Footer({pageString} : Footer) {
  return (
    <footer role="footer" aria-label="footer">
        <article id="endMessage">
            <H3Tag className={noto_sans.className}>Thank you for visiting.</H3Tag>
            <SubtitleTag>I'm looking for full-time opportunities in UX design, product design, <span className="noWidow">or similar roles.</span></SubtitleTag>
            <PTag id="conversation">Find me on LinkedIn or email if you're interested <span className="noWidow">to work with me.</span></PTag>
            {/* Container for contact buttons. */}
            <article className="contactButtons">
                <ButtonComponent type="linkedIn" imagePosition="before"/>
                <ButtonComponent type="email" imagePosition="before"/>
            </article>
        </article>
        {/* Container for navigation buttons. */}
        <article id="endNavLinks">
            <H4Tag className={noto_sans.className}>Navigation</H4Tag>
            <hr />
            <nav className="grid gridType1-320Width">
                <LinkComponent page={pageString == "home" ?  "home" : "global"} type="design" anchorLink="true" data-showbuffer={pageString == "home" ? "false" : "true"} />
                <LinkComponent page={pageString == "home" ?  "home" : "global"} type="media" anchorLink="true" data-showbuffer={pageString == "home" ? "false" : "true"} />
                <LinkComponent page={pageString == "home" ?  "home" : "global"} type="about" anchorLink="true" data-showbuffer={pageString == "home" ? "false" : "true"} />
                {/* <LinkComponent type="timeline" data-showbuffer="false"/> */}
                <LinkComponent type="timeline" anchorLink={pageString == "home" ? "true" : ""} data-showbuffer={pageString == "home" ? "false" : "true"}/>
                <LinkComponent type="topOfPage" anchorLink="true" data-showbuffer="false"/>
                {/* <LinkComponent type="topOfPage" anchorLink={pageString == "home" ? "true" : ""} data-showbuffer={pageString == "home" ? "false" : "true"}/> */}
            </nav>
        </article>
    </footer>
  );
}
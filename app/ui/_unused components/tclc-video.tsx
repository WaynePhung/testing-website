import { H3Tag, H4Tag, PTag } from "./../../ui/text/text-tags";
import Link from "next/link";
import ButtonComponent from "../buttons/button";

export default function TCLCVideo() {
    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <H3Tag>TCLC Rap Video</H3Tag>
                <H4Tag className={"tags"}>Video Production, Video Editing, Ethnography</H4Tag>
                <PTag>A rap-themed video that demonstrates how kids within an affordable housing community showcase their activities in their afterschool program.</PTag>
                <ButtonComponent type="seeCaseStudy" caseStudy={"tclcVideo"} imagePosition="after" />
            </article>
            <figure>
                <Link href="/tclc-video" rel="external" className="ratio-16-9 shadow">
                    <iframe className="ratio-16-9" src="https://www.youtube.com./embed/WQDrVQvYCAQ?si=M9ZOJaEjUJotCbTY&playsinline=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Link>
            </figure>
        </article>
    );
}
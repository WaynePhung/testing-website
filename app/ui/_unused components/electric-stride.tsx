'use client';

import { H3Tag, H4Tag, PTag } from "./../../ui/text/text-tags";
import FigureImageVideo from "../media/media-global";
import ButtonComponent from "../buttons/button";

export default function ElectricStride() {
    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <H3Tag>Electric Stride</H3Tag>
                <H4Tag className={"tags"}>UX Design, UX Research, Rapid Ideation</H4Tag>
                <PTag>An exercise mat for people with Parkinson's to train their gait and stride length. This was created during the Electrical and Computer Engineering (ECE) Design Competition.</PTag>
                <ButtonComponent type="seeCaseStudy" caseStudy={"es"} imagePosition="after" />
            </article>
            <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="main" shadow="true" wrappingLink="true"></FigureImageVideo>
        </article>
    );
}
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import Image from "next/image";
import Link from "next/link";
import { H3Tag, H4Tag, PTag } from "./../../ui/text/text-tags";
import FigureImageVideo from "../media/media-global";
import ButtonSeeCaseStudy from "./button-see-case-study";
import ButtonComponent from "../buttons/button";

import { changeStickyH2,  } from "@/app/utils/js/scroll-to-h2-main";
import javascript from "@/app/utils/js/global-layout";

export default function ElectricStride() {
    // const [result, setResult] = useState(null);

    // const handleClick = async () => {
    //     // Dynamically import the function
    //     const { javascript } = await import('./../../utils/js/global-layout');
    //     const result = javascript();
    //     setResult(result);
    // };
    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <H3Tag>Electric Stride</H3Tag>
                <H4Tag className={"tags"}>UX Design, UX Research, Rapid Ideation</H4Tag>
                <PTag>An exercise mat for people with Parkinson's to train their gait and stride length. This was created during the Electrical and Computer Engineering (ECE) Design Competition.</PTag>
                <ButtonComponent type="seeCaseStudy" caseStudy={"es"} imagePosition="after" />
                {/* <button>
                    <Link href="/electric-stride" rel="external" >
                        <ButtonSeeCaseStudy />
                    </Link>
                </button> */}
            </article>
            {/* <figure id="electric-stride"> */}
                {/* <Link href="/electric-stride" rel="external" className="shadow"> */}
                    <FigureImageVideo mediaGroup="es" mediaType="image" mediaAlias="main" shadow="true" wrappingLink="true"></FigureImageVideo>
                    {/* <picture> */}
                        {/* <Image src={images["electric-stride"]["main"]} width={400} height={533} alt="" loading="lazy" /> */}
                    {/* </picture> */}
                {/* </Link> */}
            {/* </figure> */}
        </article>
    );
}
"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { H3Tag, H4Tag, PTag } from "../ui/text/text-tags";
import { literata, noto_sans } from "../utils/text-styling/fonts";
import { caseStudyPreviewProps, caseStudyPreviews } from "./case-study-preview-content";
import ButtonComponent from "../ui/buttons/button-test";
import FigureImageVideo from "../ui/media/media-global";
import { SafeHTML } from "../ui/text/safe-html";
import checkDataBufferAttr from "../ui/buffer-page/check-data-buffer-attr";
import bpTransitionEffect from "../ui/buffer-page/bp-transition-effect";

import getMediaGroupObject from "../ui/media/get-media-group-object";

interface cspType {
    subgroup: string;
    visualAlias: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    // href: string;
}

export function CSPComponent ({subgroup, visualAlias, onClick} : cspType) : React.ReactElement | null {

    const router = useRouter();

    function delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const [getBuffer, getHref] = checkDataBufferAttr(e);
        if (getBuffer != null && getHref != null) {
            bpTransitionEffect(getHref);
            // getBuffer.classList.add("visible");
            await delay(500);
            // await new Promise(resolve => setTimeout(resolve, 500));
            router.push(getHref);
            // await delay(500);
            // await new Promise(resolve => setTimeout(resolve, 500));
            // getBuffer.classList.remove("visible");
        } else {
            // console.log('checkDataBufferAttr function\'s returned value: ', [getBuffer, getHref]);
            // console.log('checkDataBufferAttr function returned null or an incorrect value');
        }
    };
    
    let mediaGroupObject = getMediaGroupObject("case-study", subgroup);

    let getCSHref = caseStudyPreviews()[subgroup].href;

    if (mediaGroupObject && getCSHref) {
        let getObjectProps = mediaGroupObject[visualAlias];
        if (getObjectProps && 'preview' in getObjectProps) {
            const preview = getObjectProps.preview;
            if (preview) {
                return (
                    <article className="grid-default-1400 grid-case-study-preview">
                        <article>
                            <article>
                                <H3Tag className={literata.className}>
                                    {preview.title}
                                </H3Tag>
                                <H4Tag className={"tags"}>
                                    {preview.tags}
                                </H4Tag>
                            </article>
                            <PTag>
                                <SafeHTML html={preview.spiel} />
                            </PTag>
                            <ButtonComponent 
                                group="link-global"
                                subgroup={subgroup} 
                                alias="seeCaseStudy"
                                anchorLink={false}
                                icon={true}
                                imagePosition="after" showBuffer={true}buttonType="secondary" 
                            />
                        </article>
                        <FigureImageVideo 
                            group="case-study"
                            subgroup={subgroup}
                            mediaAlias={visualAlias}
                            wrappingLink={true}
                            href={getCSHref}
                        />
                    </article>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}
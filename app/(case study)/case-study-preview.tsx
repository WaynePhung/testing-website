"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { H3Tag, H4Tag, PTag } from "../ui/text/text-tags";
import { literata, noto_sans } from "../utils/text-styling/fonts";
import { caseStudyPreviewProps, caseStudyPreviews } from "./case-study-preview-content";
import ButtonComponent from "../ui/buttons/button-test";
import { SafeHTML } from "../ui/text/safe-html";
import checkDataBufferAttr from "../ui/buffer-page/check-data-buffer-attr";
import bpTransitionEffect from "../ui/buffer-page/bp-transition-effect";

interface cspType {
    type: string;
    shadow: "true" | "false";
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export function CSPComponent ({type, shadow, onClick} : cspType) : React.ReactElement | null {

    let cspPropsObject = caseStudyPreviews();
    const getObjectProps = cspPropsObject[type];
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
            console.log('checkDataBufferAttr function\'s returned value: ', [getBuffer, getHref]);
            console.log('checkDataBufferAttr function returned null or an incorrect value');
        }
    };
    

    let 
        imageElement = getObjectProps.image && (
            <figure id={getObjectProps.id}>
                <Link 
                    href={getObjectProps.href} 
                    rel={getObjectProps.rel} 
                    className={`${getObjectProps.image.className} ${shadow == "true" && "shadow"}`}
                    data-showbuffer="true"
                    onClick={handleClick}
                >
                    <picture>
                        <Image src={getObjectProps.image.src} width={getObjectProps.image.width} height={getObjectProps.image.height} alt={getObjectProps.image.alt} loading={getObjectProps.image.loading} />
                    </picture>
                </Link>
            </figure>
        ),
        videoElement = getObjectProps.video && (
            <figure id={getObjectProps.id}>
                <Link 
                    href={getObjectProps.href} 
                    rel={getObjectProps.rel} 
                    className={`${getObjectProps.video.className} ${shadow == "true" && "shadow"}`}
                    data-showbuffer="true"
                    onClick={handleClick}
                >
                    <iframe className={getObjectProps.video.className} src={getObjectProps.video.videoSrc}  allowFullScreen />
                </Link>
            </figure>
        ),
        iframeElement = getObjectProps.iframe && (
            <figure id={getObjectProps.id}>
                <Link 
                    href={getObjectProps.href} 
                    rel={getObjectProps.rel} 
                    className={`${getObjectProps.iframe.className} ${shadow == "true" && "shadow"}`}
                    data-showbuffer="true"
                    onClick={handleClick}
                >
                    <iframe className={getObjectProps.iframe.className} src={getObjectProps.iframe.videoSrc} allow={getObjectProps.iframe.allow}  allowFullScreen />
                </Link>
            </figure>
        );
    
    const [content, setContent] = useState<caseStudyPreviewProps[string] | null>(null);

    useEffect(() => {
        if (getObjectProps) {
            setContent(getObjectProps as caseStudyPreviewProps[string]);
        }
    }, [type]);
    
    if (!content) return null;

    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <article>
                    <H3Tag className={literata.className}>
                        {getObjectProps.title}
                    </H3Tag>
                    <H4Tag className={"tags"}>
                        {getObjectProps.tags}
                    </H4Tag>
                </article>
                <PTag>
                    <SafeHTML html={getObjectProps.spiel} />
                    {/* {getObjectProps.spiel} */}
                </PTag>
                <ButtonComponent type="seeCaseStudy" caseStudy={type} imagePosition="after" showBuffer="true"/>
            </article>
            {imageElement && imageElement || videoElement && videoElement || iframeElement && iframeElement}
        </article>
    );
}
"use client";
import { useState, useRef, useEffect } from 'react';
import { noto_sans_italic } from "./../../utils/text-styling/fonts";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { FigcaptionTag } from "../text/text-tags";

import { aboutMeMediaProps } from "@/app/utils/ts/about-me-media-props";
import { apMediaProps } from "@/app/(case study)/automation-playground/ap-media-props";
import { esMediaProps } from "@/app/(case study)/electric-stride/es-media-props";
import { thelabMediaProps } from "@/app/(case study)/the-lab/thelab-media-props";
import { ttvReelMediaProps } from "@/app/(case study)/triton-television-reel/ttv-reel-media-props";

interface mediaArgs {
    mediaGroup: string;
    mediaType: string;
    mediaAlias: string;
    wrappingLink?: "true";
    href?: Url | string;
    shadow: "true" | "false";
}

export default function FigureImageVideo ({mediaGroup, mediaType, mediaAlias, wrappingLink, href, shadow} : mediaArgs) : React.ReactElement | null | undefined {
    let mediaGroupObject;
    switch (mediaGroup) {
        case ("about-me") :
            mediaGroupObject = aboutMeMediaProps();
            break;
        case ("ap") :
            mediaGroupObject = apMediaProps();
            break;
        case ("es") :
            mediaGroupObject = esMediaProps();
            break;
        case ("thelab") :
            mediaGroupObject = thelabMediaProps();
            break;
        case ("ttvReel") :
            mediaGroupObject = ttvReelMediaProps();
            break;
        default :
            // Nothing.
            break;
    }
    if (mediaGroupObject) {
        // console.log('Media group object exists.');
        // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
        // console.log("mediaAlias: " + mediaAlias);
        const getMediaGroupProps = mediaGroupObject[mediaAlias];
        // console.log("getMediaGroupProps: " + JSON.stringify(getMediaGroupProps));
        // console.log("getMediaGroupProps[mediaAlias]: " + JSON.stringify(getMediaGroupProps.mediaType));
        if (getMediaGroupProps) {
            const renderFigcaption = 
                <FigcaptionTag>
                    {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                </FigcaptionTag>;
                // <figcaption className={noto_sans_italic.className}>
                //     {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                // </figcaption>;
            switch (getMediaGroupProps.mediaType) {
                case (getMediaGroupProps.mediaType = mediaType = "image"):
                    // console.log("get mediaAlias: " + mediaAlias);
                    // console.log("get image src: " + getMediaGroupProps.src);
                    if (wrappingLink && href) {
                        // {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && getMediaGroupProps.figcaption.text}
                        return (
                            <figure id={getMediaGroupProps.id && getMediaGroupProps.id}>
                                <Link href={href} className={`${getMediaGroupProps.className} ${shadow == "true" && "shadow"}`}>
                                    {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                    <picture>
                                        <Image 
                                            src={getMediaGroupProps.src} 
                                            width={getMediaGroupProps.width} 
                                            height={getMediaGroupProps.height} 
                                            alt={getMediaGroupProps.alt} 
                                            loading={getMediaGroupProps.loading} 
                                        />
                                    </picture>
                                    {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                                </Link>
                            </figure>
                        );
                    } else {
                        return (
                            <figure id={getMediaGroupProps.id && getMediaGroupProps.id}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                <picture className={`${getMediaGroupProps.className} ${shadow == "true" && "shadow"}`}>
                                    <Image 
                                        src={getMediaGroupProps.src} 
                                        width={getMediaGroupProps.width} 
                                        height={getMediaGroupProps.height} 
                                        alt={getMediaGroupProps.alt} 
                                        loading={getMediaGroupProps.loading} 
                                    />
                                </picture>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    }
                case (getMediaGroupProps.mediaType = mediaType = "video"):
                    const videoBooleanAttributes = (): React.VideoHTMLAttributes<HTMLVideoElement> => {
                        const attributes: React.VideoHTMLAttributes<HTMLVideoElement> = {};
                        const booleanAttributes = [
                            'autoPlay',
                            'controls',
                            'disablePictureInPicture',
                            'loop',
                            'muted',
                            'playsInline'
                          ] as const;
                          booleanAttributes.forEach(attr => {
                            // console.log(`Processing attribute: ${attr}`);
                            // console.log(`Value in options: ${getMediaGroupProps[attr]}`);
                            if (getMediaGroupProps[attr] === true) {
                                attributes[attr] = true;
                                // console.log(`Setting ${attr} to true`);
                            } else {
                                // console.log(`${attr} not set to true, skipping`);
                            }
                          });
                        //   console.log(`Current state of attributes:`, {...attributes});
                        return attributes;
                    };
                    const getVideoBooleanAttributes = videoBooleanAttributes();
                    // console.log('Final attributes: ', getVideoBooleanAttributes);
                    const renderVideo =
                            <video className={`${getMediaGroupProps.className} ${shadow == "true" && "shadow"}`} poster={`${getMediaGroupProps.posterSrc && getMediaGroupProps.posterSrc}`} controlsList={`${getMediaGroupProps.controlsList && getMediaGroupProps.controlsList}`} preload={`${getMediaGroupProps.preload && getMediaGroupProps.preload}`} {...getVideoBooleanAttributes}>
                                <source src={getMediaGroupProps.videoSrc} />
                            </video>;
                    // console.log("custom video thumbnail URL: " + getMediaGroupProps.posterSrc);
                    if (wrappingLink && href) {
                        return (
                            <figure className={`${getMediaGroupProps.autoPlay==true ? "autoplayVideo" : ""} ${shadow == "true" && "shadow"}`} data-video-subgroup={`${getMediaGroupProps.groupAlias ? getMediaGroupProps.groupAlias : ""}`}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                <Link href={href} className={`${shadow == "true" && "shadow"}`}>
                                    {renderVideo}
                                </Link>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    } else {
                        return (
                            <figure className={`${getMediaGroupProps.autoPlay==true ? "autoplayVideo" : ""}`} data-video-subgroup={`${getMediaGroupProps.groupAlias ? getMediaGroupProps.groupAlias : ""}`}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                {renderVideo}
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    }
                case (getMediaGroupProps.mediaType = mediaType = "iframe"):
                    const renderiframe =
                            // <video>
                                <iframe className={`${getMediaGroupProps.className} ${shadow == "true" && "shadow"}`} src={getMediaGroupProps.videoSrc} allow={getMediaGroupProps.allow} allowFullScreen />;
                            {/* </video>; */}
                    if (wrappingLink && href) {
                        return (
                            <figure className={`${getMediaGroupProps.autoplayVideo==true && "autoplayVideo"} ${shadow == "true" && "shadow"}`} data-video-subgroup={`${getMediaGroupProps.groupAlias && getMediaGroupProps.groupAlias}`}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                <Link href={href} className={`${shadow == "true" && "shadow"}`}>
                                    {renderiframe}
                                </Link>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    } else {
                        return (
                            <figure className={`${getMediaGroupProps.autoplayVideo==true && "autoplayVideo"}`} data-video-subgroup={`${getMediaGroupProps.groupAlias && getMediaGroupProps.groupAlias}`}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                {renderiframe}
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    }
                case (getMediaGroupProps.mediaType = mediaType = "audio"):
                    // Nothing...for now.
                default :
                    // Nothing.
            }
        }
    } else {
        // console.log('Media group object does not exist.');
        return null;
    }
}
"use client";
import { noto_sans_italic } from "./../../utils/text-styling/fonts";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';

import { aboutMeMediaProps } from "@/app/utils/ts/about-me-media-props";
import { apMediaProps } from "@/app/(case study)/automation-playground/ap-media-props";
import { esMediaProps } from "@/app/(case study)/electric-stride/es-media-props";
import { thelabMediaProps } from "@/app/(case study)/the-lab/thelab-media-props";

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
            // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
            break;
        case ("ap") :
            mediaGroupObject = apMediaProps();
            // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
            break;
        case ("es") :
            mediaGroupObject = esMediaProps();
            // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
            break;
        case ("thelab") :
            mediaGroupObject = thelabMediaProps();
            // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
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
                    <figcaption className={noto_sans_italic.className}>
                        {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                    </figcaption>;
            switch (getMediaGroupProps.mediaType) {
                case (getMediaGroupProps.mediaType = mediaType = "image"):
                    // console.log("get mediaAlias: " + mediaAlias);
                    // console.log("get image src: " + getMediaGroupProps.src);
                    if (wrappingLink && href) {
                        // {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && getMediaGroupProps.figcaption.text}
                        return (
                            <figure>
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
                            <figure>
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
                    const 
                        [isPlaying, setIsPlaying] = useState(false),
                        videoRef = useRef<HTMLIFrameElement | null>(null),
                        // videoRef = useRef<HTMLVideoElement | null>(null),
                        videoTemplate =
                            // <iframe ref={videoRef} className={getMediaGroupProps.className} src={getMediaGroupProps.videoSrc} allow={getMediaGroupProps.allow} allowFullScreen />,
                            <iframe ref={videoRef} className={getMediaGroupProps.className} src={getMediaGroupProps.videoSrc} allowFullScreen />,
                        // videoTemplate =
                        // <video 
                        //     ref={videoRef} 
                        //     width={320}
                        //     height={176}
                        //     controls 
                        //     autoPlay
                        //     // allow={getMediaGroupProps.allow} 
                        // >
                        //     <source 
                        //         className={getMediaGroupProps.className} 
                        //         src={getMediaGroupProps.videoSrc} 
                        //         width={320}
                        //         height={176}
                        //         type="video/mp4"
                        //     />
                        // </video>,
                        videoURL = `${getMediaGroupProps.videoSrc}`;
                    useEffect(() => {
                        if (isPlaying && videoRef.current) {
                            // Add autoplay parameter to the URL
                            videoRef.current.src = `${videoURL}?autoplay=1`;
                        }
                        }, [isPlaying, videoURL]);
                    const handlePlay = () => {
                        setIsPlaying(true);
                    };
                    // console.log("custom video thumbnail URL: " + getMediaGroupProps.posterSrc);
                    if (wrappingLink && href) {
                        return (
                            <figure>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                <Link href={href} className={`${shadow == "true" && "shadow"}`}>
                                    {(!isPlaying && getMediaGroupProps.posterSrc) ? (
                                        <picture className={`${shadow == "true" && "shadow"}`}>
                                            <Image 
                                            src={getMediaGroupProps.posterSrc} 
                                            alt="Video thumbnail"
                                            width={1200}
                                            height={800}
                                            onClick={() => handlePlay}
                                            className="video-thumbnail"
                                            />
                                        </picture>
                                    ) : (
                                        videoTemplate
                                    )}
                                </Link>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                            </figure>
                        );
                    } else {
                        return (
                            <figure className={`${shadow == "true" && "shadow"}`}>
                                {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                {(!isPlaying && getMediaGroupProps.posterSrc) ? (
                                    <picture className={`${shadow == "true" && "shadow"}`}>
                                        <Image 
                                        src={getMediaGroupProps.posterSrc} 
                                        alt="Video thumbnail"
                                        width={1200}
                                        height={800}
                                        onClick={() => setIsPlaying(true)}
                                        className="video-thumbnail"
                                        />
                                    </picture>
                                ) : (
                                    videoTemplate
                                )}
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
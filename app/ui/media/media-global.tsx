"use client";
import { useState, useEffect } from 'react';
import { noto_sans_italic } from "./../../utils/text-styling/fonts";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { FigcaptionTag } from "../text/text-tags";
import FigurePlaceholder from "../placeholders/figure-placeholder";

import { aboutMeMediaProps } from "@/app/utils/ts/about-me-media-props";
import { apMediaProps } from "@/app/(case study)/automation-playground/ap-media-props";
import { esMediaProps } from "@/app/(case study)/electric-stride/es-media-props";
import { thelabMediaProps } from "@/app/(case study)/the-lab/thelab-media-props";
import { ttvReelMediaProps } from "@/app/(case study)/triton-television-reel/ttv-reel-media-props";

import { ImageMedia, VideoMedia, IframeMedia, AudioMedia } from './media-content';

interface mediaArgs {
    mediaGroup: string;
    mediaType: string;
    mediaAlias: string;
    wrappingLink?: "true";
    href?: Url | string;
    shadow: "true" | "false";
}

export default function FigureImageVideo ({mediaGroup, mediaType, mediaAlias, wrappingLink, href, shadow} : mediaArgs) : React.ReactElement | null | undefined {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

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

    useEffect(() => {
        // const loadedState = localStorage.getItem(`${mediaType}-${mediaAlias}-loaded`);
        setTimeout(() => {
            // if (loadedState === 'true') {
                setIsLoaded(true);
                // setHasLoaded(true);
            // }
        }, 5000); // 5 seconds delay
    }, [mediaType, mediaAlias]);

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoaded(true);
            // setHasLoaded(true);
            // localStorage.setItem(`${mediaType}-${mediaAlias}-loaded`, 'true');
        }, 5000); // 5 seconds delay
    };

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
            
            const renderContent = () => {
                switch (getMediaGroupProps.mediaType) {
                    case "image":
                        const imageProps = getMediaGroupProps as ImageMedia;
                        if (!isLoaded && !hasLoaded) {
                            return (
                                <FigurePlaceholder className={`${imageProps.className}`} />
                            )
                        } else {
                            return (
                                <picture className={`${imageProps.className} ${shadow == "true" && "shadow"}`}>
                                    <Image 
                                        src={imageProps.src} 
                                        width={imageProps.width} 
                                        height={imageProps.height} 
                                        alt={imageProps.alt} 
                                        loading={imageProps.loading}
                                        onLoad={handleLoad}
                                        className={isLoaded ? 'fade-in' : 'hidden'}
                                    />
                                </picture>
                            );
                        }
                    case "video":
                        const videoProps = getMediaGroupProps as VideoMedia;
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
                                if (videoProps[attr] === true) {
                                    attributes[attr] = true;
                                }
                            });
                            return attributes;
                        };
                        const getVideoBooleanAttributes = videoBooleanAttributes();
                        if (!isLoaded && !hasLoaded) {
                            return (
                                <FigurePlaceholder className={`${videoProps.className}`} />
                            )
                        } else {
                            return (
                                <video 
                                    className={`${videoProps.className} ${shadow == "true" && "shadow"}`} 
                                    poster={videoProps.posterSrc} 
                                    controlsList={videoProps.controlsList}
                                    preload={videoProps.preload}
                                    {...getVideoBooleanAttributes}
                                    onLoadedData={handleLoad}
                                >
                                    <source src={videoProps.videoSrc} />
                                </video>
                            )
                        }
                    case "iframe":
                        const iframeProps = getMediaGroupProps as IframeMedia;
                        if (!isLoaded && !hasLoaded) {
                            return (
                                <FigurePlaceholder className={`${iframeProps.className}`} />
                            )
                        } else {
                            return (
                                <iframe 
                                    className={`${iframeProps.className} ${shadow == "true" && "shadow"}`} 
                                    src={iframeProps.videoSrc} 
                                    allow={iframeProps.allow} 
                                    allowFullScreen
                                    onLoad={handleLoad}
                                />
                            )
                        }
                    case "audio":
                        // Implement audio rendering here
                        return null;
                    default:
                        return null;
                }
            };

            const renderFigure = () => (
                <figure 
                    id={getMediaGroupProps.mediaType === "image" ? (getMediaGroupProps as ImageMedia).id : undefined} 
                    className={`${getMediaGroupProps.mediaType === "video" && (getMediaGroupProps as VideoMedia).autoPlay ? "autoplayVideo" : ""} ${shadow == "true" && "shadow"}`}
                    data-video-subgroup={getMediaGroupProps.mediaType === "video" ? (getMediaGroupProps as VideoMedia).groupAlias : undefined}
                >
                    {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                    {renderContent()}
                    {(getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                </figure>
            );            

            if (wrappingLink && href) {
                return (
                    <Link href={href} className={`${shadow == "true" && "shadow"}`}>
                        {renderFigure()}
                    </Link>
                );
            } else {
                return renderFigure();
            }
        }
    } else {
        // console.log('Media group object does not exist.');
        return null;
    }
}

"use client";
import { ReactNode, useState, useEffect } from 'react';
import { noto_sans_italic } from "../../utils/text-styling/fonts";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { FigcaptionTag } from "../text/text-tags";
import FigurePlaceholder from "../placeholders/figure-placeholder";
import { indefinite } from "@/app/utils/ts/exported-constants";

import getMediaGroupObject from "./get-media-group-object";
import { LoCElectricStride } from "../../(case study)/electric-stride/loc-electricStride";
import { LoCTTVReel } from "../../(case study)/triton-television-reel/loc-ttv-reel";
import { LoCDefault, locLinkProps } from "../list-of-contents/loc-link-props";
import { ImageMedia, VideoMedia, IframeMedia, AudioMedia, DynamicMedia } from './media-content';
import { SeeCaseStudyProps } from "@/app/utils/ts/icon-props";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";

interface MediaProps {
    group: "about-me" | "case-study" | "loc" | "icon";
    mediaAlias: string;
    wrappingLink?: boolean;
}

type MediaArgsSubgroup = 
    (MediaProps & { group: "loc" | "case-study"; subgroup: string }) 
    | (MediaProps & { group: "about-me" | "icon"; subgroup?: string });

type MediaArgs = 
    (MediaArgsSubgroup & {wrappingLink: true; href: string}) 
    | (MediaArgsSubgroup & {wrappingLink: false; href?: string});

export default function FigureImageVideo ({group, mediaAlias, subgroup, wrappingLink=false, href} : MediaArgs) : React.ReactElement | null | undefined {
    const { isLoaded, hasLoaded, handleLoad } = useDelayedLoad();
    type MediaGroupObjectType = ReturnType<typeof getMediaGroupObject>;
    let mediaGroupObject: MediaGroupObjectType;
    switch(group) {
        case "icon":
            mediaGroupObject = getMediaGroupObject("icon") as DynamicMedia | SeeCaseStudyProps;
            if (mediaGroupObject) {
                    const imageProps = mediaGroupObject[mediaAlias] as ImageMedia;
                    if (!isLoaded && !hasLoaded) {
                        return (
                            <FigurePlaceholder id={`${imageProps.id}`} className={`${imageProps.className}`} />
                        );
                    } else {
                        return (
                            <figure id={imageProps.id} className={`${imageProps.className}`}>
                                <picture className={`${imageProps.className}`}>
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
                            </figure>
                        );
                    }
                }
                break;
        case ("loc"):
            mediaGroupObject = getMediaGroupObject(group, subgroup);
            if (mediaGroupObject) {
                const getProps = mediaGroupObject[mediaAlias] as locLinkProps;
                if (!isLoaded && !hasLoaded) {
                    return (
                        <FigurePlaceholder id={`${getProps.id}`} className={`${getProps.icon.imageClasses}`} />
                    );
                } else {
                    return (
                        <picture className={`${getProps.icon.imageClasses}`}>
                            <Image 
                                src={getProps.icon.imageSrc} 
                                width={getProps.icon.width} 
                                height={getProps.icon.height} 
                                alt={getProps.icon.alt} 
                                loading={getProps.icon.loading}
                                onLoad={handleLoad}
                                className={isLoaded ? 'fade-in' : 'hidden'}
                            />
                        </picture>
                    );
                }
            }
            break;
        case ("case-study"):
                mediaGroupObject = getMediaGroupObject(group, subgroup);
                if (mediaAlias && mediaGroupObject && mediaGroupObject[mediaAlias]) {
                    // console.log('Media group object exists.');
                    // console.log("mediaGroupObject: " + JSON.stringify(mediaGroupObject));
                    // console.log("mediaAlias: " + mediaAlias);
                    // const getMediaGroupProps = mediaGroupObject[mediaAlias] as ImageMedia | VideoMedia | IframeMedia | AudioMedia;
                    const getMediaGroupProps = mediaGroupObject[mediaAlias];
                    let renderFigcaption: ReactNode;
                    if ('figcaption' in getMediaGroupProps) {
                        renderFigcaption = 
                                <FigcaptionTag placeholder={ (!isLoaded && !hasLoaded) ? true : false}>
                                    {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                                </FigcaptionTag>
                        // if (!isLoaded && !hasLoaded) {
                        //     renderFigcaption = 
                        //         <FigcaptionTag>
                        //             {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                        //         </FigcaptionTag>
                        // } else {
                        //     renderFigcaption = 
                        //         <FigcaptionTag placeholder={ (!isLoaded && !hasLoaded) ? true : false}>
                        //             {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                        //         </FigcaptionTag>
                        // }
                            // <figcaption className={noto_sans_italic.className}>
                            //     {getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.text}
                            // </figcaption>;
                    }
                    if ('mediaType' in getMediaGroupProps) {
                        if (!isLoaded && !hasLoaded) {
                            switch (getMediaGroupProps.mediaType) {
                                case "image":
                                    const imageProps = getMediaGroupProps as ImageMedia;
                                    return (
                                        <FigurePlaceholder id={`${imageProps.id}`} className={`${imageProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(imageProps.figcaption && imageProps.figcaption.position) ? imageProps.figcaption.position : ""}>
                                            {renderFigcaption && renderFigcaption}
                                        </FigurePlaceholder>
                                    )
                                case "video":
                                    const videoProps = getMediaGroupProps as VideoMedia;
                                    return (
                                        <FigurePlaceholder id={`${videoProps.id}`} className={`${videoProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(videoProps.figcaption && videoProps.figcaption.position) ? videoProps.figcaption.position : ""}>
                                            {renderFigcaption && renderFigcaption}
                                        </FigurePlaceholder>
                                    )
                                case "iframe":
                                    const iframeProps = getMediaGroupProps as IframeMedia;
                                    return (
                                        <FigurePlaceholder id={`${iframeProps.id}`} className={`${iframeProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(iframeProps.figcaption && iframeProps.figcaption.position) ? iframeProps.figcaption.position : ""}>
                                            {renderFigcaption && renderFigcaption}
                                        </FigurePlaceholder>
                                    )
                                default:
                                    return;
                            }
                        } else {
                            const renderContent = () => {
                                switch (getMediaGroupProps.mediaType) {
                                    case "image":
                                        const imageProps = getMediaGroupProps as ImageMedia;
                                        if (!isLoaded && !hasLoaded) {
                                            console.log('imageProps.className: ' + imageProps.className);
                                            return (
                                                <FigurePlaceholder id={`${imageProps.id}`} className={`${imageProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(imageProps.figcaption && imageProps.figcaption.position) ? imageProps.figcaption.position : ""}>
                                                    {renderFigcaption && renderFigcaption}
                                                </FigurePlaceholder>
                                            )
                                        } else {
                                            return (
                                                <picture className={`${imageProps.className} ${imageProps.shadow == true && "shadow"}`}>
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
                                            console.log('videoProps.className: ' + videoProps.className);
                                            return (
                                                <FigurePlaceholder id={`${videoProps.id}`} className={`${videoProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(videoProps.figcaption && videoProps.figcaption.position) ? videoProps.figcaption.position : ""}>
                                                    {renderFigcaption && renderFigcaption}
                                                </FigurePlaceholder>
                                            )
                                        } else {
                                            return (
                                                <video 
                                                    className={`${videoProps.className} ${videoProps.shadow == true && "shadow"}`} 
                                                    poster={videoProps.posterSrc} 
                                                    controlsList={videoProps.controlsList}
                                                    preload={videoProps.preload}
                                                    {...getVideoBooleanAttributes}
                                                    onLoadedData={handleLoad}
                                                >
                                                    <source src={videoProps.src} />
                                                </video>
                                            )
                                        }
                                    case "iframe":
                                        const iframeProps = getMediaGroupProps as IframeMedia;
                                        if (!isLoaded && !hasLoaded) {
                                            console.log('iframeProps.className: ' + iframeProps.className);
                                            return (
                                                <FigurePlaceholder id={`${iframeProps.id}`} className={`${iframeProps.className}`} figcaption={renderFigcaption ? true : false} figcaptionPosition={(iframeProps.figcaption && iframeProps.figcaption.position) ? iframeProps.figcaption.position : ""}>
                                                    {renderFigcaption && renderFigcaption}
                                                </FigurePlaceholder>
                                            )
                                        } else {
                                            return (
                                                <iframe 
                                                    className={`${iframeProps.className} ${iframeProps.shadow == true && "shadow"}`} 
                                                    src={iframeProps.src} 
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
                            if ((getMediaGroupProps as ImageMedia | VideoMedia | IframeMedia | AudioMedia)) {
                                let getMediaType = getMediaGroupProps as ImageMedia | VideoMedia | IframeMedia | AudioMedia;
                                const renderFigure = () => (
                                    <figure 
                                        id={getMediaGroupProps.mediaType === "image" ? (getMediaGroupProps as ImageMedia).id : undefined} 
                                        className={`${getMediaType.className && getMediaType.className} ${getMediaGroupProps.mediaType === "video" && (getMediaGroupProps as VideoMedia).autoPlay ?  "autoplayVideo" : ""} ${getMediaType.shadow == true && "shadow"}`}
                                        data-video-subgroup={getMediaGroupProps.mediaType === "video" ? (getMediaGroupProps as VideoMedia).groupAlias : undefined}
                                    >
                                        {(renderFigcaption != undefined && getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "before") && renderFigcaption}
                                        {renderContent()}
                                        {(renderFigcaption != undefined && getMediaGroupProps.figcaption && getMediaGroupProps.figcaption.position == "after") && renderFigcaption}
                                    </figure>
                                );
                                if (wrappingLink == true && href) {
                                    return (
                                        <Link id={getMediaType.id} href={href} className={`${getMediaType.className && getMediaType.className} ${getMediaGroupProps.shadow == true && "shadow"}`}>
                                            {renderFigure()}
                                        </Link>
                                    );
                                } else {
                                    return renderFigure();
                                }
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
}

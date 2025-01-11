interface CaseStudyPreview {
  preview?: {
    title: string;
    tags?: string;
    spiel: string;
    rel: "external" | string;
  }
}

interface FigcaptionProps {
  figcaption?: {
    position: "before" | "after";
    text: string;
  }
}

export type ImageMedia = {
  mediaType: "image";
  id?: string;
  className?: string;
  width: number;
  height: number;
  imageRatio: string;
  src: string;
  shadow: boolean;

  alt: string;
  loading: "lazy" | "eager";
} & FigcaptionProps & CaseStudyPreview;

type VideoIframeProps = {
  id?: string;
  className?: string;
  videoRatio: string;
  src: string;
  autoplayVideo?: boolean;
  groupAlias?: string;
  shadow: boolean;
} & FigcaptionProps & CaseStudyPreview;

export type VideoMedia = VideoIframeProps & {
  mediaType: "video";
  autoPlay?: boolean;
  controls?: boolean;
  controlsList?: string;
  disablePictureInPicture?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  posterSrc?: string;
  preload?: "auto" | "metadata" | "none";
}

export type IframeMedia = VideoIframeProps & {
  mediaType: "iframe";
  allow?: string;
  youtubeID?: string;
}

export type AudioMedia = {
  // To be defined.
  mediaType: "audio";
  id?: string;
  className?: string;
  src: string;
  ratio?: string;
  shadow: boolean;
} & FigcaptionProps;

export type DynamicMedia = {
  [key: string]: ImageMedia | VideoMedia | IframeMedia | AudioMedia;
};

// export type MediaTypes = "image" | "video" | "iframe" | "audio";

// export type DynamicMedia<T extends MediaTypes> = {
//   [key: string]: T extends "image" ? ImageMedia :
//                  T extends "video" ? VideoMedia :
//                  T extends "iframe" ? IframeMedia :
//                  T extends "audio" ? AudioMedia :
//                  never;
// };

// export function createDynamicMedia<T extends MediaTypes>(mediaType: T, media: DynamicMedia<T>): DynamicMedia<T> {
//   return media;
// }
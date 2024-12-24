export interface ImageMedia {
  imageRatio: string;
  className: string;
  id?: string;
  src: string; 
  width: number;
  height: number;
  alt: string;
  figcaption?: {
    text: string;
    position: "before" | "after";
  }
  loading: "lazy" | "eager";
}

export interface VideoIframeProps {
  autoplayVideo?: boolean;
  className: string;
  figcaption?: {
    text: string;
    position: "before" | "after";
  }
  groupAlias?: string;
  videoRatio: string;
  videoSrc: string;
}

export interface VideoMedia extends VideoIframeProps {
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

export interface IframeMedia extends VideoIframeProps {
  allow?: string;
  videoSrc: string;
  youtubeID?: string;
}

export interface AudioMedia {
  // To be defined.
  figcaption?: {
    text: string;
    position: "before" | "after";
  }
}

export type DynamicMedia = {
  [key: string]:
    | ({ mediaType: "image" } & ImageMedia)
    | ({ mediaType: "video" } & VideoMedia)
    | ({ mediaType: "iframe" } & IframeMedia)
    | ({ mediaType: "audio" } & AudioMedia);
};

export function createDynamicMedia(media: DynamicMedia): DynamicMedia {
    return media;
}
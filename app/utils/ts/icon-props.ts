import { ImageMedia, DynamicMedia } from "../../ui/media/media-content";
import { size_space_num } from "../size-spacing/nums-size-space";

export type SeeCaseStudyProps = DynamicMedia & {
    [key: string]: {
        href: {
            [key: string] : string;
        }
    },
}

export function iconMediaProps() : DynamicMedia | SeeCaseStudyProps {
    return {
        email: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: size_space_num["l-num"],
            height: size_space_num["l-num"],
            imageRatio: "4-3",
            src: "icons/email.svg",
            shadow: false,
            alt: "email icon",
            loading: "lazy",
        },
        linkedIn: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: size_space_num["l-num"],
            height: size_space_num["l-num"],
            imageRatio: "1-1",
            src: "icons/linkedIn.svg",
            shadow: false,
            alt: "linkedin icon",
            loading: "lazy",
        },
        seeCaseStudy: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: size_space_num["l-num"],
            height: size_space_num["l-num"],
            imageRatio: "1-1",
            src: "icons/arrow-right.svg",
            shadow: false,
            alt: "see case study icon as a right arrow",
            loading: "lazy",
            href: {
                // thelab: slash + "the-lab",
                // es: slash + "electric-stride",
                // ap: slash + "automation-playground",
                // tclc: slash + "tclc-video",
                // ttvReel: slash + "triton-television-reel"
                theLab: "the-lab",
                es: "electric-stride",
                ap: "automation-playground",
                tclc: "tclc-video",
                ttvReel: "triton-television-reel"
            },
        },
        listOfContents: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: size_space_num["l-num"],
            height: size_space_num["l-num"],
            imageRatio: "1-1",
            src: "icons/list-of-contents.svg",
            shadow: false,
            alt: "open list of contents icon",
            loading: "lazy",
        },
        placeholder_button_icon: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: size_space_num["l-num"],
            height: size_space_num["l-num"],
            imageRatio: "1-1",
            src: "icons/empty.png",
            shadow: false,
            alt: "empty placeholder icon",
            loading: "eager",
        }
    }
};
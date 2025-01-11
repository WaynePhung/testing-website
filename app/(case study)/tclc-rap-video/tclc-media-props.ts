import { DynamicMedia } from "../../ui/media/media-content";

export function tclcMediaProps() : DynamicMedia {
    return {
        // finalDraft: {
        //     mediaType: "video",
        //     id: "tclc",
        //     get className(): string {
        //         return `ratio-${(this as { videoRatio: string }).videoRatio}`;
        //     },
        //     videoRatio: "16-9",
        //     src: "/tclc-video/03-original-webp/tclcVideo.webp",
        //     // src: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
        //     // src: "https://mega.nz/embed/BNxVWYgY#wrj_hmGU5SHx4x6OLAs8Dk2UFv3mzEUdFhTAx24p6DE!1a",
        //     // posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
        //     // posterSrc:"/other/placeholderImage.png",
        //     posterSrc: "/tclc-video/01-original-png/tclcVideo.png",
        //     shadow: true, 
        //     figcaption: {
        //         text: "Testing video2 figcaption.",
        //         position: "after"
        //     },
        //     autoPlay: true,
        //     controls: true,
        //     controlsList: "nofullscreen nodownload noplaybackrate",
        //     disablePictureInPicture: true,
        //     loop: true,
        //     muted: true,
        //     playsInline: true,
        //     preload: "auto",
        //     // allow: "autoplay",
        //     preview: {
        //         title: "TCLC Rap Video",
        //         tags: "video production, video editing, ethnography",
        //         spiel: "A rap-themed video that demonstrates how kids within an affordable housing community showcase their activities in their afterschool program.",
        //         rel: "external"
        //     }
        // }
        finalDraft: {
            mediaType: "iframe", 
            id: "tclc",
            get className(): string {
                return `ratio-${(this as { videoRatio: string }).videoRatio}`;
            },
            videoRatio: "16-9",
            src: "https://www.youtube.com/embed/WQDrVQvYCAQ?si=1BXJ5pghSWr5-cLT",
            shadow: true,
            preview: {
                title: "TCLC Rap Video",
                tags: "video production, video editing, ethnography",
                spiel: "A rap-themed video that demonstrates how kids within an affordable housing community showcase their activities in their afterschool program.",
                rel: "external"
            }
        }
    }
};
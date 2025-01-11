import { DynamicMedia } from "../../ui/media/media-content";

export function ttvReelMediaProps() : DynamicMedia {
    return {
        placeholderVideo1: {
            mediaType: "video",
            get className(): string {
                return `ratio-${(this as { videoRatio: string }).videoRatio}`;
            },
            videoRatio: "325-183",
            src: "/ttv-reel/iteration1-650-compressed.webm",
            // src: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            // src: "https://mega.nz/embed/BNxVWYgY#wrj_hmGU5SHx4x6OLAs8Dk2UFv3mzEUdFhTAx24p6DE!1a",
            // posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            // posterSrc:"/other/placeholderImage.png",
            shadow: true, 
            figcaption: {
                // text: "Testing video1 figcaption.",
                text: "Figcaption text.",
                position: "after"
            },
            autoPlay: true,
            controls: false,
            controlsList: "nofullscreen nodownload noplaybackrate",
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
            posterSrc: "/ttv-reel/iteration1-650-compressed.png",
            preload: "auto"
            // allow: "autoplay",
        },
        placeholderVideo2: {
            mediaType: "video",
            get className(): string {
                return `ratio-${(this as { videoRatio: string }).videoRatio}`;
            },
            videoRatio: "16-9",
            src: "/ttv-reel/ttvReel-finalDraft-compressed.mp4",
            // src: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            // src: "https://mega.nz/embed/BNxVWYgY#wrj_hmGU5SHx4x6OLAs8Dk2UFv3mzEUdFhTAx24p6DE!1a",
            // posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            // posterSrc:"/other/placeholderImage.png",
            shadow: true, 
            figcaption: {
                text: "Testing video2 figcaption.",
                position: "after"
            },
            autoPlay: true,
            controls: true,
            controlsList: "nofullscreen nodownload noplaybackrate",
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
            posterSrc: "/ttv-reel/tritonTelevisionReel-826-compressed.png",
            preload: "auto",
            // allow: "autoplay",
        },
        finalDraft: {
            mediaType: "iframe", 
            id: "ttv-reel",
            get className(): string {
                return `ratio-${(this as { videoRatio: string }).videoRatio}`;
            },
            videoRatio: "16-9",
            src: "https://www.youtube.com./embed/uQnnd5la29Q?si=hOcClVyV_TdNKLPN&playsinline=1",
            shadow: true,
            preview: {
                title: "Triton Television Reel",
                tags: "video editing",
                spiel: "This video showcases student projects within Triton Television (TTV), a film and media production student organization at University of California - San Diego.", 
                rel: "external"
            },
        }
    }
};
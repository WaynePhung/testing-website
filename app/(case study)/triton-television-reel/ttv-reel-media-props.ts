import { DynamicMedia } from "../../ui/media/media-content";

export function ttvReelMediaProps() : DynamicMedia {
    return {
        finalDraft: {
            mediaType: "iframe",
            get className() {
                return `ratio-${this.videoRatio}`;
            },
            videoRatio: "16-9",
            videoSrc: "https://www.youtube.com./embed/uQnnd5la29Q?si=hOcClVyV_TdNKLPN&playsinline=1"
        },
        placeholderVideo1: {
            mediaType: "video",
            get className() {
                return `ratio-${this.videoRatio}`;
            },
            figcaption: {
                text: "Testing video1 figcaption.",
                position: "after"
            },
            videoRatio: "325-183",
            videoSrc: "/ttv-reel/iteration1-650-compressed.webm",
            
            autoPlay: true,
            controls: false,
            controlsList: "nofullscreen nodownload noplaybackrate",
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
            posterSrc: "/ttv-reel/iteration1-650-compressed.png",
            preload: "auto"
            // videoSrc: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            // videoSrc: "https://mega.nz/embed/BNxVWYgY#wrj_hmGU5SHx4x6OLAs8Dk2UFv3mzEUdFhTAx24p6DE!1a",
            // posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            // posterSrc:"/other/placeholderImage.png",
            // allow: "autoplay",
        },
        placeholderVideo2: {
            mediaType: "video",
            get className() {
                return `ratio-${this.videoRatio}`;
            },
            figcaption: {
                text: "Testing video2 figcaption.",
                position: "after"
            },
            videoRatio: "16-9",
            videoSrc: "/ttv-reel/ttvReel-finalDraft-compressed.mp4",
            
            autoPlay: true,
            controls: true,
            controlsList: "nofullscreen nodownload noplaybackrate",
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
            posterSrc: "/ttv-reel/tritonTelevisionReel-826-compressed.png",
            preload: "auto"
            // videoSrc: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            // videoSrc: "https://mega.nz/embed/BNxVWYgY#wrj_hmGU5SHx4x6OLAs8Dk2UFv3mzEUdFhTAx24p6DE!1a",
            // posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            // posterSrc:"/other/placeholderImage.png",
            // allow: "autoplay",
        }
    }
};
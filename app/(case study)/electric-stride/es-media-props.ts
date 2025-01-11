import { DynamicMedia } from "../../ui/media/media-content";

export function esMediaProps(): DynamicMedia {
    return {
        main: {
            mediaType: "image",
            id: "e-stride",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: 400,
            height: 533,
            imageRatio: "3-4",
            src: "https://lh3.googleusercontent.com/d/1o0nvYqzkj7BCcTTI48nMutDIDsSKeDZO",
            shadow: true,
            alt: "",
            loading: "eager",
            preview: {
                title: "Electric Stride",
                tags: "UX design, UX research, rapid ideation",
                spiel: "An exercise mat for people with Parkinson's to train their gait and stride length. <br> This was created during the Electrical and Computer Engineering (ECE) Design Competition.",
                rel: "external"
            }
        },
        placeholder: {
            mediaType: "image",
            imageRatio: "3-2",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            src: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            width: 1200,
            height: 800,
            alt: "",
            figcaption: {
                text: "Testing figcaption",
                position: "after"
            },
            loading: "eager", 
            shadow: true
        },
        placeholderVideo: {
            mediaType: "video",
            get className(): string {
                return `ratio-${(this as { videoRatio: string }).videoRatio}`;
            },
            figcaption: {
                text: "Testing video1 figcaption.",
                position: "after"
            },
            videoRatio: "20-11",
            src: "https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            autoPlay: true,
            controls: true,
            controlsList: "nofullscreen nodownload noplaybackrate",
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
            posterSrc: "https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            preload: "auto",
            shadow: true
        }
    }
};
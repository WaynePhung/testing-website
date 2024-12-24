import { DynamicMedia } from "../../ui/media/media-content";

export function esMediaProps() : DynamicMedia {
    return {
        main: {
            mediaType: "image",
            imageRatio: "3-4",
            get className() {
                return `ratio-${this.imageRatio}`;
            },
            src: "https://lh3.googleusercontent.com/d/1o0nvYqzkj7BCcTTI48nMutDIDsSKeDZO",
            // src: "https://drive.google.com/drive-viewer/AKGpihbej1-VMvYkkbPEfbVZrwd4Ef2S1SMenVMlS54SvpPo_01jetHKwSCDvCDUlZJqQfJlYPFwAa_si42GeBa9fnETGjzYn7CIP-Q=w1920-h965-rw-v1",
            // src:"/electric-stride/03-original-webp/ElectricStride.webp",
            width: 400,
            height: 533,
            alt: "",
            loading: "eager"
        },
        placeholder: {
            mediaType: "image",
            imageRatio: "3-2",
            get className() {
                return `ratio-${this.imageRatio}`;
            },
            // src:"https://drive.google.com/drive-viewer/AKGpihaKeEdWGm9jC7viCK-UctX-t0j4IZJK0olaaEpCuk5U5V8KoAKKtW08_rq2Hzj7-JvZzkcKPZvNCwORJ9yvuim_eNPMstio5x0=s1600-rw-v1",
            // src:"https://drive.google.com/drive-viewer/AKGpihaf8fOYeiC6ebdaDi-52jeCvFyLwbMJ0jbOK1WVQ0NYoXhLQy1g-yBrlqvAeqJCnOecJ1lcs3niy8sPp3trzEU3_7PuATGxVmY=s1600-rw-v1",
            src:"https://lh3.googleusercontent.com/d/1VCr6T9vQmA5CtG2IHcVAIulD5vwq1rWp",
            // src:"/other/placeholderImage.png",
            width: 1200,
            height: 800,
            alt: "",
            figcaption: {
                text: "Testing figcaption",
                position: "after"
            },
            loading: "eager"
        },
        placeholderVideo: {
            mediaType: "video",
            videoRatio: "20-11",
            get className() {
                return `ratio-${this.videoRatio}`;
            },
            // videoSrc:"https://drive.google.com/drive-viewer/AKGpihaKeEdWGm9jC7viCK-UctX-t0j4IZJK0olaaEpCuk5U5V8KoAKKtW08_rq2Hzj7-JvZzkcKPZvNCwORJ9yvuim_eNPMstio5x0=s1600-rw-v1",
            // videoSrc:"https://drive.google.com/drive-viewer/AKGpihaf8fOYeiC6ebdaDi-52jeCvFyLwbMJ0jbOK1WVQ0NYoXhLQy1g-yBrlqvAeqJCnOecJ1lcs3niy8sPp3trzEU3_7PuATGxVmY=s1600-rw-v1",
            // videoSrc:"https://lh3.googleusercontent.com/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd",
            videoSrc:"https://drive.google.com/file/d/1EE7BKLrd2bKulDBnzcOjaJUAmjd9X2Yd/preview",
            // src:"/other/placeholderImage.png",
            figcaption: {
                text: "Testing video figcaption.",
                position: "after"
            }
        }
    }
};
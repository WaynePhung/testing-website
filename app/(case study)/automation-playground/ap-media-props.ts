import { DynamicMedia } from "../../ui/media/media-content";

export function apMediaProps() : DynamicMedia {
    return {
        // main: {
        //     mediaType: "image",
        //     imageRatio: "3-4",
        //     get className() {
        //         return `ratio-${this.imageRatio}`;
        //     },
        //     src:"/electric-stride/03-original-webp/ElectricStride.webp",
        //     width: 400,
        //     height: 533,
        //     alt: "",
        //     loading: "eager"
        // }
        placeholder: {
            mediaType: "image",
            imageRatio: "3-2",
            get className() {
                return `ratio-${this.imageRatio}`;
            },
            src:"https://drive.google.com/drive-viewer/AKGpihaKeEdWGm9jC7viCK-UctX-t0j4IZJK0olaaEpCuk5U5V8KoAKKtW08_rq2Hzj7-JvZzkcKPZvNCwORJ9yvuim_eNPMstio5x0=s1600-rw-v1",
            // src:"https://drive.google.com/drive-viewer/AKGpihaf8fOYeiC6ebdaDi-52jeCvFyLwbMJ0jbOK1WVQ0NYoXhLQy1g-yBrlqvAeqJCnOecJ1lcs3niy8sPp3trzEU3_7PuATGxVmY=s1600-rw-v1",
            // src:"/electric-stride/03-original-webp/ElectricStride.webp",
            width: 1200,
            height: 800,
            alt: "",
            loading: "eager"
        }
    }
};
import { DynamicMedia } from "../../ui/media/media-content";

export function apMediaProps() : DynamicMedia {
    return {
        main: {
            mediaType: "image",
            id: "auto-pg",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: 400,
            height: 533,
            imageRatio: "2-1",
            src:"/automation-playground/03-original-webp/automation-playground-desktop-mobile.webp",
            shadow: false,
            alt: "",
            loading: "eager",
            preview: {
                title: "Automation Playground",
                tags: "web design, prototyping",
                spiel: "Automation Playground is a research subgroup of UC San Diego's Design Lab. <br /> Helped to spearhead a web design project to showcase the research group for the former founder.",
                rel: "external"
            }
        },
        placeholder: {
            mediaType: "image",
            get className(): string {
                return `ratio-${(this as { imageRatio: string }).imageRatio}`;
            },
            width: 1200,
            height: 800,
            imageRatio: "3-2",
            src:"https://drive.google.com/drive-viewer/AKGpihaKeEdWGm9jC7viCK-UctX-t0j4IZJK0olaaEpCuk5U5V8KoAKKtW08_rq2Hzj7-JvZzkcKPZvNCwORJ9yvuim_eNPMstio5x0=s1600-rw-v1",
            // src:"https://drive.google.com/drive-viewer/AKGpihaf8fOYeiC6ebdaDi-52jeCvFyLwbMJ0jbOK1WVQ0NYoXhLQy1g-yBrlqvAeqJCnOecJ1lcs3niy8sPp3trzEU3_7PuATGxVmY=s1600-rw-v1",
            // src:"/electric-stride/03-original-webp/ElectricStride.webp",
            shadow: true,
            alt: "",
            loading: "eager",
            figcaption: {
                text: "text",
                position: "before"
            }
        }
    }
};
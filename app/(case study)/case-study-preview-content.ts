import { getLinkProps, SeeCaseStudyProps } from "../utils/ts/link-types";
import { ImageMedia, VideoMedia, IframeMedia, AudioMedia } from "../ui/media/media-content";

let getLinkPropsObject = getLinkProps();
const seeCaseStudyProps = getLinkPropsObject["seeCaseStudy"] as SeeCaseStudyProps;

export interface caseStudyPreviewProps {
    [key: string]: {
        id?: string;
        title: string;
        tags?: string;
        spiel: string;
        href: string;
        rel: string;
        // mediaType: string;
        image?: {
            // [key in string]: {
                [imageKey in keyof ImageMedia] : ImageMedia[imageKey]
            // }
        };
        video?: {
            // [key in string]: {
                [videoKey in keyof VideoMedia] : VideoMedia[videoKey]
            // }
        };
        iframe?: {
            // [key in string]: {
                [iframeKey in keyof IframeMedia] : IframeMedia[iframeKey]
            // }
        };
        audio?: {
            // [key in string]: {
                [audioKey in keyof AudioMedia] : AudioMedia[audioKey]
            // }
        };
    }
}

export function caseStudyPreviews() : caseStudyPreviewProps {
    return {
        thelab: {
            id: "the-lab",
            title: "Technology, Health, and Education (THE) Lab",
            tags: "website redesign, technical documentation, task management",
            spiel: "I facilitated clearer communication and project development of a research and hearing-related software platform among engineers and software developers. <br><br><b>Role:</b> Mediator of project activities and addressing requests/questions with collaborators on the founder's behalf.",
            href: seeCaseStudyProps["href"]["electricStride"],
            rel: "external",
            // mediaType: "image",
            image: {
                // main: {
                    mediaType: "image",
                    imageRatio: "8-5",
                    get className() {
                        return `ratio-${this.imageRatio}`;
                    },
                    src:  "/public/the-lab/THELab-websiteForum.svg",
                    width: 1440,
                    height: 900,
                    alt: "",
                    loading: "eager",
                    shadow: false
                // }
            }
        },
        ap: {
            id: "auto-pg",
            title: "Automation Playground",
            tags: "web design, prototyping",
            spiel: "Automation Playground is a research subgroup of UC San Diego's Design Lab. <br /> Helped to spearhead a web design project to showcase the research group for the former founder.",
            href: seeCaseStudyProps["href"]["ap"],
            rel: "external",
            // mediaType: "image",
            image: {
                // main: {
                    mediaType: "image",
                    imageRatio: "2-1",
                    get className() {
                        return `ratio-${this.imageRatio}`;
                    },
                    src: "/automation-playground/03-original-webp/automation-playground-desktop-mobile.webp",
                    width: 800,
                    height: 400,
                    alt: "",
                    loading: "eager",
                    shadow: false
                // }
            }
        },
        es: {
            id: "e-stride",
            title: "Electric Stride",
            tags: "UX design, UX research, rapid ideation",
            spiel: "An exercise mat for people with Parkinson's to train their gait and stride length. <br> This was created during the Electrical and Computer Engineering (ECE) Design Competition.",
            href: seeCaseStudyProps["href"]["es"],
            rel: "external",
            // mediaType: "image",
            image: {
                // main: {
                    mediaType: "image",
                    imageRatio: "3-4",
                    get className() {
                        return `ratio-${this.imageRatio}`;
                    },
                    src: "https://lh3.googleusercontent.com/d/1o0nvYqzkj7BCcTTI48nMutDIDsSKeDZO",
                    // src:  "https://drive.google.com/drive-viewer/AKGpihbej1-VMvYkkbPEfbVZrwd4Ef2S1SMenVMlS54SvpPo_01jetHKwSCDvCDUlZJqQfJlYPFwAa_si42GeBa9fnETGjzYn7CIP-Q=w1920-h965-rw-v1",
                    // src: "https://drive.google.com/uc?export=view&id=1rUd7fZW29nIhqsqwiTsuC5waE31uvZnM",
                    // src: "/electric-stride/03-original-webp/ElectricStride.webp",
                    width: 400,
                    height: 533,
                    alt: "",
                    loading: "eager",
                    shadow: true
                // }
            }
        },
        ttvReel: {
            id: "ttv-reel",
            title: "Triton Television Reel",
            tags: "video editing",
            spiel: "This video showcases student projects within Triton Television (TTV), a film and media production student organization at University of California - San Diego.",
            href: seeCaseStudyProps["href"]["ttvReel"],
            rel: "external",
            // mediaType: "iframe",
            iframe: {
                // main: {
                    mediaType: "iframe",
                    get className() {
                        return `ratio-${this.videoRatio}`;
                    },
                    shadow: true, 
                    videoRatio: "16-9",
                    // src: "https://drive.google.com/file/d/1215G1vyShzW0Tl9nQUcbcwV7O6JBTkUf/preview",
                    src: "https://www.youtube.com./embed/uQnnd5la29Q?si=hOcClVyV_TdNKLPN&playsinline=1",
                    // Can append "&autoplay=1" to the end of the URL to enable autoplay and "&mute=1" to mute the video by default.
                    // allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // }
            }
        },
        tclc: {
            id: "tclc",
            title: "TCLC Rap Video",
            tags: "video production, video editing, ethnography",
            spiel: "A rap-themed video that demonstrates how kids within an affordable housing community showcase their activities in their afterschool program.",
            href: seeCaseStudyProps["href"]["tclc"],
            rel: "external",
            // mediaType: "iframe",
            iframe: {
                // main: {
                    mediaType: "iframe",
                    get className() {
                        return `ratio-${this.videoRatio}`;
                    },
                    shadow: true,
                    videoRatio: "16-9",
                    // src: "https://drive.google.com/file/d/1VLv3ER3QdJayEiVz81lPhghQbYJVKwK4/preview",
                    src: "https://www.youtube.com./embed/WQDrVQvYCAQ?si=M9ZOJaEjUJotCbTY&playsinline=1",
                    // allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // }
            }
        }
    }
}
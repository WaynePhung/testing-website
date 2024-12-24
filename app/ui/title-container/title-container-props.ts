import { ImageMedia, VideoMedia, IframeMedia, AudioMedia } from "../media/media-content";
interface titleContainerProps {
    [key: string]: {
        id?: string;
        title: string;
        spiel: string;
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

export function titleContainerContent() : titleContainerProps {
    return {
        error: {
            title: "The page or file that you are looking for doesn't exist.",
            spiel: "Select the button or scroll below to see my other case studies."
        },
        testing: {
            title: "Default heading 1",
            spiel: ""
        }
    }
}
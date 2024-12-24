import { DynamicMedia } from "../../ui/media/media-content";

export function aboutMeMediaProps() : DynamicMedia {
    return {
        profilePicture: {
            mediaType: "image",
            imageRatio: "3-2",
            get className() {
                return `ratio-${this.imageRatio}`;
            },
            src: "https://lh3.googleusercontent.com/d/1o0nvYqzkj7BCcTTI48nMutDIDsSKeDZO",
            // src: "https://drive.google.com/drive-viewer/AKGpihbej1-VMvYkkbPEfbVZrwd4Ef2S1SMenVMlS54SvpPo_01jetHKwSCDvCDUlZJqQfJlYPFwAa_si42GeBa9fnETGjzYn7CIP-Q=w1920-h965-rw-v1",
            // src:"/electric-stride/03-original-webp/ElectricStride.webp",
            width: 1500,
            height: 1000,
            alt: "",
            loading: "eager"
        },
    }
};
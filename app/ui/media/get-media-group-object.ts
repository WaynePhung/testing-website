import { aboutMeMediaProps } from "@/app/utils/ts/about-me-media-props";
import { apMediaProps } from "@/app/(case study)/automation-playground/ap-media-props";
import { esMediaProps } from "@/app/(case study)/electric-stride/es-media-props";
import { thelabMediaProps } from "@/app/(case study)/the-lab/thelab-media-props";
import { tclcMediaProps } from "@/app/(case study)/tclc-rap-video/tclc-media-props";
import { ttvReelMediaProps } from "@/app/(case study)/triton-television-reel/ttv-reel-media-props";
import { iconMediaProps } from "@/app/utils/ts/icon-props";
import { LinkProps, SeeCaseStudyProps, getLinkProps } from "@/app/utils/ts/link-types";
import { LoCElectricStride } from "@/app/(case study)/electric-stride/loc-electricStride";
import { LoCTTVReel } from "@/app/(case study)/triton-television-reel/loc-ttv-reel";
import { LoCDefault } from "../list-of-contents/loc-link-props";
import { DynamicMedia } from "./media-content";
import { locLinkProps } from "../list-of-contents/loc-link-props";

// interface functionProps {
//     group: string;
//     subgroup?: "" | string;
// }

export default function getMediaGroupObject(group: string, subgroup="") {
    switch (group) {
        case ("about-me") :
            return aboutMeMediaProps();
        case ("case-study") :
            if (subgroup != "") {
                switch (subgroup) {
                    case ("ap") : 
                        return apMediaProps();
                    case ("es") :
                        return esMediaProps();
                    case ("tclc") :
                        return tclcMediaProps();
                    case ("ttvReel") :
                        return ttvReelMediaProps();
                    case ("theLab") :
                        return thelabMediaProps();
                }
            } else {
                console.error("Subgroup is not specified for case-study.");
                return null;
            }
        case ("icon") :
            return iconMediaProps();
        case ("link") :
        case ("link-global") :
            if (subgroup == "page") {
                return getLinkProps(subgroup);
            } else {
                return getLinkProps();
            }
        case ("loc") :
            switch (subgroup) {
                case "es" :
                    return LoCElectricStride();
                case "ttvReel" :
                    return LoCTTVReel();
                default :
                    return LoCDefault();
            }
        default :
            // Nothing.
            return null;
    }
}
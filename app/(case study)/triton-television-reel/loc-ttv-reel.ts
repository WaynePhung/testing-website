import { size_space_num } from "../../utils/size-spacing/nums-size-space";
import { locLinkProps, topOfPageMobileID, topOfPageDesktopID, otherCaseStudiesPropsMobileID, otherCaseStudiesPropsDesktopID} from "../../ui/list-of-contents/loc-link-props";

export function LoCTTVReel() : { [key: string]: locLinkProps} {
    return {
        topOfPage: topOfPageMobileID,
        introduction: {
            text: "Introduction",
            href: "#introduction",
            ariaLabel: "Anchor link to the Introduction section.",
            role: "anchor link",
            icon: {
                imageSrc: "icons/book.svg",
                imageClasses: "icon ratio-1-1",
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                alt: "icon of an arrow pointing up to indicate the top of the page",
                loading: "lazy"
            }
        },
        otherCaseStudies: otherCaseStudiesPropsMobileID
    }
}
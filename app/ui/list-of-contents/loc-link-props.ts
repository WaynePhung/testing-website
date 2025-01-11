import { size_space_num } from "../../utils/size-spacing/nums-size-space";
// import { LinkProps } from "../utils/ts/link-types";

// loc/Loc = List of Contents

export interface locLinkProps {
    text: string;
    href: string;
    ariaLabel?: string;
    id?: string;
    role?: string;
    rel?: string;
    target?: string;
    icon: {
        imageSrc: string;
        imageClasses: `icon ratio-${string}`
        width: number;
        height: number;
        alt: string | "";
        loading: "lazy";
    }
}

export const topOfPageMobileID: locLinkProps = {
    text: "Top of Page",
    href: "#top-of-page",
    ariaLabel: "Anchor link to the top of the page.",
    role: "anchor link",
    id: "toTop-mobile",
    icon: {
        imageSrc: "icons/arrow-up.svg",
        imageClasses: "icon ratio-1-1",
        width: size_space_num["l-num"],
        height: size_space_num["l-num"],
        alt: "Icon of an arrow pointing up to indicate the top of the page.",
        loading: "lazy",
    }
}

export const topOfPageDesktopID: locLinkProps = {
    ...topOfPageMobileID,
    id: "toTop-desktop"
};

// export function getTopOfPageProps() : locLinkProps {
//     return {
//         text: "Top of Page",
//         href: "#title",
//         ariaLabel: "Anchor link to the top of the page.",
//         role: "anchor link",
//         icon: {
//             imageSrc: "icons/arrow-up.svg",
//             imageClasses: "icon ratio-1-1",
//             width: size_space_num["l-num"],
//             height: size_space_num["l-num"],
//             alt: "Icon of an arrow pointing up to indicate the top of the page.",
//             loading: "lazy",
//         }
//     }
// }

export const otherCaseStudiesPropsMobileID: locLinkProps = {
    text: "Other Case Studies",
    href: "#other-case-studies",
    ariaLabel: "Anchor link to view other case studies.",
    id: "other-case-studies-mobile",
    role: "anchor link",
    icon: {
        imageSrc: "icons/horizontal-dots.svg",
        imageClasses: "icon ratio-1-1",
        width: size_space_num["l-num"],
        height: size_space_num["l-num"],
        alt: "Three dark gray dots aligned horizontally to indicate other case studies.",
        loading: "lazy"
    }
}

export const otherCaseStudiesPropsDesktopID: locLinkProps = {
    ...otherCaseStudiesPropsMobileID,
    id: "other-case-studies-desktop"
};

export function LoCDefault() : { [key: string]: locLinkProps} {
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
        // otherCaseStudies: otherCaseStudiesPropsMobileID
        otherCaseStudies: {
            text: "Other Case Studies",
            href: "#other-case-studies",
            ariaLabel: "Anchor link to view other case studies.",
            id: "other-case-studies-mobile",
            role: "anchor link",
            icon: {
                imageSrc: "icons/horizontal-dots.svg",
                imageClasses: "icon ratio-1-1",
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                alt: "Three dark gray dots aligned horizontally to indicate other case studies.",
                loading: "lazy"
            }
        }
    }
}


// export function getOtherCaseStudiesProps() : locLinkProps {
//     return {
//         text: "Other Case Studies",
//         href: "#other-case-studies",
//         ariaLabel: "Anchor link to view other case studies.",
//         role: "anchor link",
//         icon: {
//             imageSrc: "icons/horizontal-dots.svg",
//             imageClasses: "icon ratio-1-1",
//             width: size_space_num["l-num"],
//             height: size_space_num["l-num"],
//             alt: "Three dark gray dots aligned horizontally to indicate other case studies.",
//             loading: "lazy"
//         }
//     }
// }
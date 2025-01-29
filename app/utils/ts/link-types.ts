import { size_space_num } from "../size-spacing/nums-size-space";
import { ImageMedia } from "@/app/ui/media/media-content";

export interface LinkProps {
    text?: string;
    class?: string;
    href?: string | 
    { 
        [key: string]: string
    };
    ariaLabel?: string;
    id?: string;
    role?: string;
    rel?: string;
    target?: string;
    icon?: {
        [imageKey in keyof ImageMedia] : ImageMedia[imageKey]
    } & 
    {
        className: `icon ratio-${string}`
    }
    showBuffer?: "true";
    // children: React.ReactNode;
}

export interface SeeCaseStudyProps extends Omit<LinkProps, 'href'> {
    href: {
      [key: string]: string;
    };
}

const
    slash = "/",
    designHref = "#design-work",
    mediaHref = "#media-work",
    aboutHref = "#about-me";

export function getLinkProps(navBarType?: string) : { [key: string]: LinkProps | SeeCaseStudyProps } {
    return {
        home: {
            text: "Wayne Phung",
            href: slash,
            id: "waynephung",
            role: "link",
            ariaLabel: "back to home"
        },
        homepage: {
            text: "Go to Home Page",
            href: slash,
            id: "waynephung",
            role: "link",
            ariaLabel: "back to home"
        },
        menu: {
            text: "Menu",
            role: "link",
            ariaLabel: "menu to view list of website navigation options"
        },
        closeMenu: {
            text: "Close",
            role: "link",
            ariaLabel: "collapse and close list of website navigation options"
        },
        design: {
            text: "Design",
            href: (navBarType == "home" ? designHref : slash + designHref),
            role: "link",
            ariaLabel: "anchor link to design section of the homepage"
        },
        media: {
            text: "Media",
            href: (navBarType == "home" ? mediaHref : slash + mediaHref),
            role: "link",
            ariaLabel: "anchor link to media section of the homepage"
        },
        about: {
            text: "About Me",
            href: (navBarType == "home" ? aboutHref : slash + aboutHref),
            role: "link",
            ariaLabel: "anchor link to media section of the homepage"
        },
        timeline: {
            text: "Timeline",
            href: "timeline",
            role: "link",
            ariaLabel: "external link to my career timeline page",
        },
        contact: {
            text: "Contact Me",
            href: "#contact",
            role: "link",
            ariaLabel: "anchor link to contact Wayne Phung via email or LinkedIn"
        },
        email: {
            text: "Email",
            href: "mailto:waynephung1@gmail.com",
            role: "link",
            ariaLabel: "anchor link to contact Wayne Phung via email",
            rel: "external",
            target: "_blank",
            icon: {
                mediaType: "image", 
                src: "icons/email.svg",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "4-3",
                alt: "email icon",
                loading: "lazy",
                shadow: false
            }
        },
        sendEmail: {
            // text: "Send Email",
            role: "link",
            ariaLabel: "button to submit contact form",
            // rel: "external",
            // target: "_blank",
            icon: {
                mediaType: "image", 
                src: "icons/arrow-right.svg",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "1-1",
                alt: "submit icon as a right arrow",
                loading: "lazy",
                shadow: false
            },
        },
        linkedIn: {
            text: "LinkedIn",
            href: "https://www.linkedin.com/in/wayne-phung-8a8242102/",
            role: "link",
            ariaLabel: "anchor link to contact Wayne Phung via LinkedIn",
            rel: "external",
            target: "_blank",
            icon: {
                mediaType: "image", 
                src: "icons/linkedIn.svg",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "1-1",
                alt: "linkedin icon",
                loading: "lazy",
                shadow: false
            }
        },
        seeCaseStudy: {
            text: "See Case Study",
            href: {
                // thelab: slash + "the-lab",
                // es: slash + "electric-stride",
                // ap: slash + "automation-playground",
                // tclc: slash + "tclc-video",
                // ttvReel: slash + "triton-television-reel"
                theLab: "the-lab",
                es: "electric-stride",
                ap: "automation-playground",
                tclc: "tclc-video",
                ttvReel: "triton-television-reel"
            },
            rel: "external",
            role: "link",
            ariaLabel: "see case study",
            icon: {
                mediaType: "image", 
                src: "icons/arrow-right.svg",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "1-1",
                alt: "see case study icon as a right arrow",
                loading: "lazy",
                shadow: false
            },
            showBuffer: "true"
        },
        listOfContents: {
            text: "List of Contents",
            role: "button",
            ariaLabel: "open list of contents",
            icon: {
                mediaType: "image", 
                src: "icons/list-of-contents.svg",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "1-1",
                alt: "open list of contents icon",
                loading: "lazy",
                shadow: false
            }
        },
        topOfPage: {
            text: "Top of Page",
            href: "#top-of-page",
            role: "link",
            ariaLabel: "anchor link to top of the page"
        },
        placeholder_button_icon: {
            text: "Text",
            role: "button",
            ariaLabel: "placeholder button with an empty icon until the button is loaded",
            icon: {
                mediaType: "image", 
                src: "icons/empty.png",
                get className(): `icon ratio-${string}` {
                    return `icon ratio-${this.imageRatio}`;
                },
                width: size_space_num["l-num"],
                height: size_space_num["l-num"],
                imageRatio: "1-1",
                alt: "empty placeholder icon",
                loading: "eager",
                shadow: false
            }
        }
    }
}
// import { sendEmail } from "./email-api";

export interface ButtonProps {
    class?: string;
    id?: string;
    role?: string;
    ariaLabel?: string;
}

export function getButtonProps() : { [key: string]: ButtonProps } {
    return {
        homepage: {
            role: "button",
            ariaLabel: "back to home page"
        },
        menu: {
            role: "button",
            ariaLabel: "menu to view list of website navigation options"
        },
        closeMenu: {
            role: "button",
            ariaLabel: "collapse and close list of website navigation options"
        },
        contact: {
            id: "contactButton",
            role: "button",
            ariaLabel: "contact button"
        },
        email: {
            class: "email",
            id: "emailButton",
            role: "button",
            ariaLabel: "button with a nested link to contact Wayne Phung via email"
        },
        sendEmail: {
            class: "Send Email",
            id: "sendEmail",
            role: "button",
            ariaLabel: "button to submit contact form"
        },
        linkedIn: {
            class: "linkedIn",
            id: "linkedInButton",
            role: "button",
            ariaLabel: "button with a nested link to contact Wayne Phung via LinkedIn"
        },
        seeCaseStudy: {
            role: "button",
            ariaLabel: "button to view the corresponding case study"
        },
        listOfContents: {
            class: "loc-mobileButton",
            role: "button",
            ariaLabel: "button to open the table of contents"
        },
        placeholder_button_icon: {
            class: "-placeholder",
            role: "button",
            ariaLabel: "placeholder button with an empty icon until the button is loaded"
        }
    }
}
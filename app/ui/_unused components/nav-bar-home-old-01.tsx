import React from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import Button_LinkedIn from "../_unused components/button-linkedIn";
import Button_Email from "../_unused components/button-email";

export default function NavBarHome() {
    return(
        <header className={noto_sans.className} role="banner" aria-label="navigation header">
            {/* navigation tab: Container for all of the buttons, but not the progress bar. */}
            <nav className="navigationBar" role="navigation" aria-label="group of navigation links">
                {/* "Wayne Phung" button to redirect to the home page. */}
                <Link href="/" rel="external" className={`${noto_sans.className} navLink`} id="waynephung" role="link" aria-label="back to home">
                    <span className={noto_sans.className}>Wayne Phung</span>
                </Link>
                {/* Buttons to direct to general sections of the website, including design work, media work, description about me, and contact section.
                The "Contact Me" button appears contained only in the mobile view. */}
                <nav className="anchorLinks" role="anchorLinks" aria-label="group of main mavigation links">
                    <Link href="#design-work" className="navLink" role="link" aria-label="anchor link to design section of the homepage">
                        <span className={noto_sans.className}>Design</span>
                    </Link>
                    <Link href="#media-work" className="navLink" role="link" aria-label="anchor link to media section of the homepage">
                        <span className={noto_sans.className}>Media</span>
                    </Link>
                    <Link href="#about-me" className="navLink" role="link" aria-label="anchor link to about me section of the homepage">
                        <span className={noto_sans.className}>About Me</span>
                    </Link>
                    <Link href="timeline" className="navLink" rel="external" role="link" aria-label="anchor link to cv page">
                        <span className={noto_sans.className}>Timeline</span>
                    </Link>
                    {/* <Link href="#conversation" className="navLink" role="link" aria-label="anchor link to contact section of the homepage" id="contactButton-mobile">
                        <span className={noto_sans.className}>Contact Me</span>
                    </Link> */}
                </nav>
                {/* The "Contact Me" button here appears on the lower/upper-right side of the screen for tablet and desktop screen sizes. */}
                <button id="contactButton" role="button" aria-label="contact button">
                    <Link href="#conversation" role="link" aria-label="anchor link to contact Wayne Phung via email or LinkedIn">
                        <span className={noto_sans.className}>Contact Me</span>
                    </Link>
                </button>
                <div className="contactButtons">
                    <Button_LinkedIn />
                    <Button_Email />
                </div>
            </nav>
            {/* Horizontal progress bar that only appears on tablet/desktop screen sizes. */}
            <div className="progressContainer" aria-label="progress bar container">
                {/* Indicator that dynamically changes in length based on how far down the person has scrolled down the web page. */}
                <div className="progressBar"></div>
            </div>
        </header>
    );
}
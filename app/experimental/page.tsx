"use client";

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TitleSection from "../ui/title-container/title-container-default";
import PTagPlaceholder from "../ui/placeholders/ptag-placeholder";
import { H2Tag, H1Tag, PTag } from "../ui/text/text-tags";
import ButtonComponent from "../ui/buttons/button";
import { SafeHTML } from "../ui/text/safe-html";
import { getTextProps } from "./text-props";
import { childrenToString } from "../ui/text/childrenToString";
import FigureImageVideo from "../ui/media/media-global";

// import EmailForm from "../ui/email-form/email-form";
// import ContactForm from "../ui/email-form/contact-form";
// import ContactFormEmail from "../ui/email-form/contact-form-email";
// import SimpleForm from "../ui/email-form/simple";
// import Rhf from "../ui/email-form/rhf";
// import RhfWithAction from "../ui/email-form/with-action";
// import RhfWithZod from "../ui/email-form/rhf-with-zod";
// import EmailForm from "../ui/email-form-old/email-form-old-01";
import { ContactForm } from "../ui/email-form/email-form-test";

// Dynamically import EmailForm with SSR disabled
// const EmailForm = dynamic(() => import("../ui/email-form/email-form"), {
//     ssr: false,
//     loading: () => <p>Loading form...</p>,
// });

export default function ExperimentalPage() {

    const getText = getTextProps();

    return (
        <>
            <TitleSection pageType="testing"></TitleSection>
            <section className="bodyContent">
                <section className="content">
                    {/* <ContactForm /> */}
                    {/* <ContactFormEmail name="name" email="testemail@gmail.com" message="test message" /> */}
                    {/* <SimpleForm /> */}
                    {/* <Rhf /> */}
                    {/* <RhfWithZod /> */}
                    {/* <RhfWithAction /> */}
                    <Suspense fallback={<div>Loading form...</div>}>
                        <ContactForm />
                        {/* <EmailForm /> */}
                    </Suspense>
                    <ButtonComponent 
                        group="link-global"
                        alias="homepage" 
                        anchorLink={false}
                        showBuffer={true} 
                        buttonType="primary" 
                    />
                    <FigureImageVideo 
                        group="case-study"
                        subgroup="es" 
                        mediaAlias="main" 
                        wrappingLink={false} 
                    />
                    <PTag>
                        <SafeHTML html={childrenToString(getText.heading1.text1.text)} />
                        {/* {getText.heading1.text1.text} */}
                    </PTag>
                    <PTag>
                        {getText.heading2_1.text1.text}
                    </PTag>
                </section>
            </section>
        </>
    );
}

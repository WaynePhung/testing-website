"use client";

import { Suspense, useState, useEffect } from 'react';
import TitleSection from "../ui/title-container/title-container-default";
import PTagPlaceholder from "../ui/placeholders/ptag-placeholder";
import { H2Tag, H1Tag, PTag } from "../ui/text/text-tags";
import ButtonComponent from "../ui/buttons/button-test";
import { SafeHTML } from "../ui/text/safe-html";
import { getTextProps } from "./text-props";
import { childrenToString } from "../ui/text/childrenToString";
import Figure from "../ui/media/media-global-test";

export default function ExperimentalPage() {

    const getText = getTextProps();

    return (
        <>
            <TitleSection pageType="testing"></TitleSection>
            <section className="bodyContent">
                <section className="content">
                    <ButtonComponent type="homepage" showBuffer="true"></ButtonComponent>
                    <Figure mediaGroup="es" mediaType="image" mediaAlias="main" shadow="true" wrappingLink="true"></Figure>
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

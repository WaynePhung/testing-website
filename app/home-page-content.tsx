"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
// import { literata, noto_sans } from "./utils/text-styling/fonts";
import { H1Tag, H2Tag, PTag } from "./ui/text/text-tags";
import { CSPComponent } from "./(case study)/case-study-preview";

import ElectricStride from "./ui/_unused components/electric-stride";
import AutoPG from "./ui/_unused components/automation-playground";
import TTVReel from "./ui/_unused components/triton-television-reel";
import TCLCVideo from "./ui/_unused components/tclc-video";

export default function HomePageContent() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="title" id="home-title">
        <H1Tag id="home-h1">Wayne Phung</H1Tag>
        <PTag>
          <b>My last role:</b> small academic group at the University of California - San Diego
          <br/>
          worked to improve how engineers and developers communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
        </PTag>
      </section>
      <section className="work-previews" id="design-work">
        <H2Tag>Design Work</H2Tag>
        <article>
          <CSPComponent type="es" shadow="true" />
          <CSPComponent type="ap" shadow="false"/>
          {/* <ElectricStride />
          <AutoPG /> */}
        </article>
      </section>
      <section className="work-previews" id="media-work">
        <H2Tag>Media Work</H2Tag>
        <article>
          <CSPComponent type="ttvReel" shadow="true" />
          <CSPComponent type="tclc" shadow="true" />
          {/* <TTVReel />
          <TCLCVideo /> */}
        </article>
      </section>
      <section id="about-me">
        <H2Tag>About Me</H2Tag>
        <article className="grid-default-1400">
          <article>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
            <PTag>
              <b>My last role:</b> small academic group at the University of California - San Diego
              <br/>
              worked to improve how they communicated their <Link href="https://thelab.ucsd.edu/" rel="external" target="_blank">open-source hearing research toolkit</Link>
            </PTag>
          </article>
        </article>
      </section>
    </>
  );
}

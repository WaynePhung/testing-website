"use client";
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { H1Tag } from "./ui/text/text-tags";
import BufferVisual from "./ui/buffer-visual/buffer-visual";
import changeBPText from "./ui/buffer-page/change-bp-text";
import path from "path";
import { childrenToString } from "./ui/text/childrenToString";

interface LoadingPageProps {
  children?: ReactNode;
}

export default function Loading ({children} : LoadingPageProps) : React.ReactElement | null {
  // const pathname = usePathname();
  // const getBuffer = document.querySelector("aside.loading-page");
  // if (getBuffer instanceof Element) {
  //   const getH1 = getBuffer.querySelector("h1");
  //   if (getH1) {
  //       getH1.textContent = changeBPText(pathname);
  //   }
  // }
  return (
    <>
      {/* <aside 
        className={`loading-page visible`}
        aria-label="Page transition"
      >
        <BufferVisual></BufferVisual>
        <H1Tag></H1Tag>
      </aside>
      {children} */}
      {/* {children} */}
      <aside 
        className={`loading-page visible`}
        aria-label="Page transition"
      >
        <BufferVisual></BufferVisual>
        <H1Tag placeholder={false}>{children}</H1Tag>
      </aside>
    </>
  );
};

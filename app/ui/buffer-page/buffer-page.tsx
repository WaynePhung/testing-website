"use client";
import { H1Tag, PTag } from "./../../ui/text/text-tags";
import { useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import bpTransitionEffect from "./bp-transition-effect";
import changeBPText from "./change-bp-text";

import path from "path";

interface BufferPageProps {
  children: ReactNode;
  text?: string;
  // minDisplayTime?: number;
}

const BufferPage: React.FC<BufferPageProps> = ({ children, text }) => {
// const BufferPage: React.FC<BufferPageProps> = ({ children, minDisplayTime = 300 }) => {
  // const pathname = usePathname();
  // const [fullPath, setFullPath] = useState<string>(window.location.pathname + window.location.hash || '');

  // let changedText;
  // useEffect(() => {
  //   // setFullPath(window.location.pathname + window.location.hash);
  //   let fullPath = window.location.pathname + window.location.hash;
  //   if (fullPath) {
  //     bpTransitionEffect(fullPath);
  //   } else {
  //     bpTransitionEffect(pathname);
  //   }
  //   // bpTransitionEffect(fullPath);
  // }, [pathname]);
  // const [destinationPathname, setDestinationPathname] = useState<string | null>(null)

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     const newDestination = window.location.pathname
  //     console.log('newDestination: ' + newDestination);
  //     console.log('currentPathname: ' + currentPathname);
  //     if (newDestination !== currentPathname) {
  //       setDestinationPathname(newDestination)
  //     }
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [currentPathname]);
  const [displayChildren, setDisplayChildren] = useState(children);
  // console.log('URL path for buffer: ' + fullPath);
  // let changedText = "viewing page...";
  // switch(fullPath) {
  //   case ("/"):
  //     changedText = "viewing home page...";
  //     break;
  //   case ("/#design-work"):
  //   case ("#design-work"):
  //     changedText = "viewing design work...";
  //     break;
  //   case ("/#media-work"):
  //   case ("#media-work"):
  //     changedText = "viewing media work...";
  //     break;
  //   case ("/#about-me"):
  //   case ("#about-me"):
  //     changedText = "about me...";
  //     break;
  //   case ("/electric-stride"):
  //   case ("electric-stride"):
  //     changedText = "viewing the Electric Stride case study...";
  //     break;
  //   case ("/triton-television-reel"):
  //   case ("triton-television-reel"):
  //     changedText = "viewing the TTV Reel case study...";
  //     break;
  //   default: 
  //     // changedText does not change.
  // }
  return (
    <>
      {displayChildren}
      <aside 
        className={`buffer-page visible`}
        aria-label="Page transition"
      >
        <H1Tag>{children}</H1Tag>
      </aside>
    </>
  );
};

export default BufferPage;

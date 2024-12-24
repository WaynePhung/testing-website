"use client";

import ButtonComponent from "./ui/buttons/button";
import { H2Tag, H1Tag, PTag } from "./ui/text/text-tags";
import { CSPComponent } from "./(case study)/case-study-preview";
import ErrorPage from "./error/page";

export default function NotFoundPage() {
  return (
    <>
      <ErrorPage />
    </>
  );
}
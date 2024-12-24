import TTVReelContent from "./ttv-reel-content";
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "TTV Reel"
  };
}

export default function Page() {
  return (
    <TTVReelContent />
  );
}

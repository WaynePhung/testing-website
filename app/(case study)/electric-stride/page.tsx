import ESContent from "./es-content";
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Electric Stride"
  };
}

export default function Page() {
  return (
    <ESContent />
  );
}

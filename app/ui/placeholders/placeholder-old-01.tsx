// components/Placeholder.tsx

import React, { useEffect, useState } from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";

interface PlaceholderProps {
  tag: string;
  children: React.ReactNode;
  delayTimer?: number;
}

export default function Placeholder({ tag, children, delayTimer = 6000000000 }: PlaceholderProps) {
  const [lines, setLines] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('delay timer: ' + delayTimer);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayTimer * 1000);

    return () => clearTimeout(timer);
  }, [delayTimer]);

  useEffect(() => {
    if (typeof children === 'string') {
      const filteredText = children.replace(/<(?!br\s*\/?)[^>]+>/g, '');
      const breakLines = (filteredText.match(/<br\s*\/?>\s*<br\s*\/?>/g) || []).length;
      const textLines = Math.ceil(filteredText.length / 50); // Approximate line calculation
      setLines(Array(textLines + breakLines).fill(0));
    } else {
      setLines([0]); // Default to one line for non-string children
    }
  }, [children]);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={`placeholder ${tag}`}>
      {lines.map((_, index) => (
        <div key={index} className={`placeholder-line ${tag == 'span' && noto_sans.className}`}>
          {tag == 'span' && 'Link Text'}
        </div>
      ))}
    </div>
  );
}

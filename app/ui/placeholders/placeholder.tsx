// components/Placeholder.tsx

import React, { useEffect, useState, useRef } from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";

// Define the props interface for the Placeholder component
interface PlaceholderProps {
  tag: 'p' | 'span' | 'subtitle' | 'figcaption' | 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  // containerWidth?: number;
  delayTimer?: number;
}

// Define the tag properties interface
interface TagProperties {
  fontSize: number;
  charWidth: number;
  fontFamily: string;
  paddingBottom: number;
  lineHeight: number;
}

// Define tag properties for each tag type
const tagProperties: Record<string, TagProperties> = {
  p: {
    fontSize: 18,
    charWidth: 18 * 0.55,
    fontFamily: 'Noto Sans',
    paddingBottom: 18 * 0.35,
    lineHeight: 1.6
  },
  span: {
    fontSize: 16,
    charWidth: 16 * 0.55,
    fontFamily: 'Noto Sans',
    paddingBottom: 0,
    lineHeight: 1.5
  },
  subtitle: {
    fontSize: 20,
    charWidth: 20 * 0.55,
    fontFamily: 'Noto Sans',
    paddingBottom: 20 * 0.4,
    lineHeight: 1.5
  },
  figcaption: {
    fontSize: 16,
    charWidth: 16 * 0.6,
    fontFamily: 'Noto Sans Italic',
    paddingBottom: 24 * 0.75,
    lineHeight: 1.5
  },
  h1: {
    fontSize: 48,
    charWidth: 48 * 0.6,
    fontFamily: 'Literata',
    paddingBottom: 18 * 0.75,
    lineHeight: 1.2
  },
  h2: {
    fontSize: 36,
    charWidth: 36 * 0.6,
    fontFamily: 'Literata',
    paddingBottom: 16,
    lineHeight: 1.25
  },
  h3: {
    fontSize: 28,
    charWidth: 28 * 0.6,
    fontFamily: 'Literata',
    paddingBottom: 18 * 0.55,
    lineHeight: 1.3
  },
  h4: {
    fontSize: 24,
    charWidth: 24 * 0.6,
    fontFamily: 'Noto Sans',
    paddingBottom: 18 * 0.45,
    lineHeight: 1.375
  }
};

export default function Placeholder({ tag, children, delayTimer = 600000 }: PlaceholderProps) {
  const [placeholderLines, setPlaceholderLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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
    // Get container width
    if (!containerRef.current) {
      console.log('No container.');
      return;
    };

    const containerWidth = containerRef.current.offsetWidth;

    // Extract raw text and break tags from children
    const rawText = React.Children.toArray(children).reduce((acc, child) => {
      if (React.isValidElement<{ children: React.ReactNode }>(child) && typeof child.props.children === 'string') {
        return acc + child.props.children.replace(/<(?!br\s*\/?)[^>]+>/g, '');
      }
      return acc;
    }, '');

    console.log('tag: ' + tag + ' rawText: ' + rawText);

    const properties = tagProperties[tag];
    const maxCharsPerLine = Math.floor(containerWidth / properties.charWidth);


    // Split text by break tags
    const textParts: string[] = (typeof rawText === 'string' ? rawText : rawText.toString()).split(/<br\s*\/?>/);

    const lines: number[] = [];

    textParts.forEach((part: string, index: number) => {
      // Calculate number of lines needed for this part
      const partLines = Math.ceil(part.length / maxCharsPerLine);
      for (let i = 0; i < partLines; i++) {
        const lineLength = Math.min(maxCharsPerLine, part.length - i * maxCharsPerLine);
        lines.push(lineLength * properties.charWidth);
      }
      if (part !== textParts[textParts.length - 1]) {
        lines.push(0);
      }
    });


    setPlaceholderLines(lines);
  }, [children, tag]);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={`placeholder ${tag}`}>
      {placeholderLines.map((width, index) => (
        <div
          key={index}
          className={`placeholder-line placeholder-line-${tag} ${tag === 'span' && noto_sans.className}`}
          style={{
            height: `${tagProperties[tag]?.lineHeight || 1.2}em`,
            width: (tag === 'span') ? '100%' : width ? `${width}px` : '100%',
            marginBottom: `${tagProperties[tag]?.paddingBottom || 0}px`,
          }}
        >
          {tag === 'span' ? 'Link Text' : ''}
        </div>
      ))}
    </div>
  );
}

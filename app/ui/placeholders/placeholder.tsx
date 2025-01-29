// components/Placeholder.tsx

import React, { useEffect, useState, useRef, ReactElement, ReactNode } from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";
import { SafeHTML } from "../text/safe-html";
import { indefinite } from "@/app/utils/ts/exported-constants";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";

// Define the tag properties interface
interface TagProperties {
  fontSize: number;
  charWidth: number;
  fontFamily: string;
  paddingBottom: number;
  lineHeight: number;
}

interface ResponsiveTagProperties {
  default: TagProperties;
  1024: TagProperties;
}

// Define tag properties for each tag type
const tagProperties: Record<string, ResponsiveTagProperties> = {
  p: {
    default: {
      fontSize: 18,
      charWidth: 18 * 0.55, //9.9
      fontFamily: 'Noto Sans',
      paddingBottom: 18 * 0.35, //6.3
      lineHeight: 1.6
    },
    1024: {
      fontSize: 20,
      charWidth: 20 * 0.55, //11
      fontFamily: 'Noto Sans',
      paddingBottom: 20 * 0.35, //7
      lineHeight: 1.6
    }
  },
  subtitle: {
    default: {
      fontSize: 20,
      charWidth: 20 * 0.55, //11
      fontFamily: 'Noto Sans',
      paddingBottom: 18 * 0.4, //7.2
      lineHeight: 1.5
    },
    1024: {
      fontSize: 24,
      charWidth: 24 * 0.55, //13.2
      fontFamily: 'Noto Sans',
      paddingBottom: 20 * 0.4, //8
      lineHeight: 1.5
    }
  },
  span: {
    default: {
      fontSize: 16,
      charWidth: 16 * 0.55, //8.8
      fontFamily: 'Noto Sans',
      paddingBottom: 0,
      lineHeight: 1.5
    },
    1024: {
      fontSize: 16,
      charWidth: 16 * 0.55, //8.8
      fontFamily: 'Noto Sans',
      paddingBottom: 0,
      lineHeight: 1.5
    }
  },
  figcaption: {
    default: {
      fontSize: 16,
      charWidth: 16 * 0.6, //9.6
      fontFamily: 'Noto Sans Italic',
      paddingBottom: 16 * 0.75, //12
      lineHeight: 1.5
    },
    1024: {
      fontSize: 16,
      charWidth: 16 * 0.6, //9.6
      fontFamily: 'Noto Sans Italic',
      paddingBottom: 16 * 0.75, //12
      lineHeight: 1.5
    }
  },
  h1: {
    default: {
      fontSize: 48,
      charWidth: 48 * 0.6, //28.8
      fontFamily: 'Literata',
      paddingBottom: 18 * 0.75, //13.5
      lineHeight: 1.2
    },
    1024: {
      fontSize: 80,
      charWidth: 80 * 0.6, //48
      fontFamily: 'Literata',
      paddingBottom: 20 * 0.75, //15
      lineHeight: 1.2
    }
  },
  h2: {
    default: {
      fontSize: 36,
      charWidth: 36 * 0.6, //21.6
      fontFamily: 'Literata',
      paddingBottom: 18 * 0.65, //11.7
      lineHeight: 1.25
    },
    1024: {
      fontSize: 52,
      charWidth: 52 * 0.6, //31.2
      fontFamily: 'Literata',
      paddingBottom: 20 * 0.65, //13
      lineHeight: 1.25
    }
  },
  h3: {
    default: {
      fontSize: 28,
      charWidth: 28 * 0.6, //16.8
      fontFamily: 'Literata',
      paddingBottom: 18 * 0.55, //9.9
      lineHeight: 1.3
    },
    1024: {
      fontSize: 36,
      charWidth: 36 * 0.6, //21.6
      fontFamily: 'Literata',
      paddingBottom: 20 * 0.55, //11
      lineHeight: 1.3
    }
  },
  h4: {
    default: {
      fontSize: 24,
      charWidth: 24 * 0.6, //14.4
      fontFamily: 'Noto Sans',
      paddingBottom: 18 * 0.45, //8.1
      lineHeight: 1.35
    },
    1024: {
      fontSize: 24,
      charWidth: 24 * 0.6, //14.4
      fontFamily: 'Noto Sans',
      paddingBottom: 20 * 0.45, //9
      lineHeight: 1.35
    }
  }
};

// Define the props interface for the Placeholder component
interface PlaceholderProps {
  tag: keyof typeof tagProperties;
  // children: React.ReactNode;
  children: ReactElement<{ children: ReactNode }>;
  delayTimer?: number;
}

export default function Placeholder({ tag, children, delayTimer = indefinite }: PlaceholderProps) {
  const [placeholderLines, setPlaceholderLines] = useState<number[]>([]);
  const [maxWidth, setMaxWidth] = useState<number>(100); // State to hold max width
  const containerRef = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<'default' | 1024>('default');
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, hasLoaded } = useDelayedLoad({ delay: 0 });

  // useEffect(() => {
  //   // console.log('delay timer: ' + delayTimer);
  //   // Simulate loading delay
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, delayTimer * 1000);

  //   return () => clearTimeout(timer);
  // }, [delayTimer]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setBreakpoint(window.innerWidth >= 1024 ? 1024 : 'default');
  //   };

  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    // Get container width
    if (!containerRef.current) {
      // console.log('No container.');
      return;
    };

    const containerWidth = containerRef.current.offsetWidth;
    // console.log('tag: ' + tag + ' containerWidth : ' + containerWidth);

    const properties = tagProperties[tag][breakpoint];

    // Extract raw text from children
    const rawText = extractTextFromChildren(children);

    // console.log('tag: ' + tag + ' rawText: ' + rawText);

    // const maxCharsPerLine = Math.floor(containerWidth / properties.charWidth);

    // Extract raw text and break tags from children
    // const rawText = React.Children.toArray(children).reduce((acc, child) => {
    //   console.log('tag: ' + tag + ' typeof child: ' + typeof child);
    //   if (typeof child === 'string') {
    //     console.log('tag: ' + tag + ' child is string: ' + acc + child.replace(/<(?!br\s*\/?)[^>]+>/g, ''));
    //     return acc + child.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    //   } else if (React.isValidElement<{ children: React.ReactNode }>(child) && typeof child.props.children === 'string') {
    //     console.log('tag: ' + tag + ' child is not string: ' + acc + child.props.children.replace(/<(?!br\s*\/?)[^>]+>/g, ''));
    //     if (typeof child.props.children === 'string') {
    //       return acc + child.props.children.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    //     }
    //     // Handle nested children for 'p' tags
    //     if (tag === 'p' && typeof child === 'object' && child.props) {
    //       return acc + extractTextFromObject(child.props);
    //     }
    //   }
    //   return acc;
    // }, '');

    // Helper function to extract text from nested objects
    function extractTextFromObject(obj: any): string {
      if (typeof obj === 'string') {
        return obj.replace(/<(?!br\s*\/?)[^>]+>/g, '');
      }
      if (Array.isArray(obj)) {
        return obj.map(extractTextFromObject).join('');
      }
      if (typeof obj === 'object' && obj !== null) {
        if (obj.props && obj.props.children) {
          return extractTextFromObject(obj.props.children);
        }
        return Object.values(obj).map(extractTextFromObject).join('');
      }
      return '';
    }

    // console.log('rawText: ' + rawText);

    // console.log('tag: ' + tag + ' rawText: ' + rawText);

    // const properties = tagProperties[tag];
    // console.log('tag props: ' + JSON.stringify(tagProperties[tag]));
    const maxCharsPerLine = Math.floor(containerWidth / properties.charWidth);
    if (containerWidth == 0) {
      console.error('This tag does not have a container width: ' + tag + ' class name: ' + tag + ' maxCharsPerLine: ' + maxCharsPerLine);
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          console.log(child.props);
          console.log(child.type);
          console.log(child.key);
        }
      });
    }


    // Split text by break tags
    const textParts: string[] = rawText.split(/<br\s*\/?>/);

    const lines: number[] = [];

    textParts.forEach((part: string, index: number) => {
      // Calculate number of lines needed for this part
      const partLines = Math.ceil(part.length / maxCharsPerLine);
      for (let i = 0; i < partLines; i++) {
        const lineLength = Math.min(maxCharsPerLine, part.length - i * maxCharsPerLine);
        lines.push(lineLength * properties.charWidth);
      }
      if (index < textParts.length - 1) {
        lines.push(0);
      }
    });

    setPlaceholderLines(lines);
  }, [children, tag, breakpoint]);

  // Helper function to extract text from children
  function extractTextFromChildren(element: ReactElement<{ children: ReactNode }>): string {
    const { children } = element.props;
    
    if (typeof children === 'string') {
      return children.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    }
    if (Array.isArray(children)) {
      return children.map((child) => {
        if (typeof child === 'string') {
          return child.replace(/<(?!br\s*\/?)[^>]+>/g, '');
        }
        if (React.isValidElement(child)) {
          if (child.type === SafeHTML) {
            // Handle SafeHTML component
            const htmlContent = (child.props as { html: string }).html;
            return htmlContent.replace(/<(?!br\s*\/?)[^>]+>/g, '');
          }
          return extractTextFromChildren(child as ReactElement<{ children: ReactNode }>);
        }
        return '';
      }).join('');
    }
    if (React.isValidElement(children)) {
      if (children.type === SafeHTML) {
        // Handle SafeHTML component
        const htmlContent = (children.props as { html: string }).html;
        return htmlContent.replace(/<(?!br\s*\/?)[^>]+>/g, '');
      }
      return extractTextFromChildren(children as ReactElement<{ children: ReactNode }>);
    }
    return '';
  }
  

  const properties = tagProperties[tag][breakpoint];
  const calculateLineHeight = (properties: TagProperties) => {
    const baseHeight = properties.fontSize * properties.lineHeight;
    const padding = properties.fontSize * 0.2; // Approximate padding for descenders/ascenders
    const totalHeight = baseHeight + padding + properties.paddingBottom;
    return `${(totalHeight / properties.fontSize).toFixed(3)}em`;
  };
  
  // Then in the component:
  const lineHeight = calculateLineHeight(properties);

  if (isLoaded || hasLoaded) {
    return <>{children}</>;
  } else {
    return (
      <div ref={containerRef} className={`placeholder ${tag}`}>
        {placeholderLines.map((width, index) => (
          <div
            key={index}
            className={`placeholder-line placeholder-line-${tag} ${tag === 'span' && noto_sans.className}`}
            style={{
              height: `${lineHeight}em`,
              width: (tag === 'span') ? '100%' : width ? `${width}px` : '100%',
              marginBottom: `${properties.paddingBottom}px`,
            }}
          >
            {tag === 'span' ? `${children}` : ''}
            {/* {tag === 'figcaption' ? 'Figcaption Text' : ''} */}
          </div>
        ))}
      </div>
    );
  }
}

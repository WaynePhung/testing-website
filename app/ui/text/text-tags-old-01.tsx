// TextComponents.tsx

import React, { useEffect, useState } from 'react';
import { withSharedTextLogic } from "./with-loading-states";
import { useDelayedLoad, isContentReady } from "../placeholders/loading-placeholder";
import { getConfig, SharedTextState } from "./loading-content";
import { childrenToString } from "./childrenToString";
import { noto_sans, noto_sans_italic, literata } from "../../utils/text-styling/fonts";
import { SafeHTML } from "./safe-html";

let combinedClassName;

// Base interface for text props
interface BaseTextProps {
    children: React.ReactNode;
    className?: string;
    fontOverride?: boolean;
    id?: string;
    html?: boolean;
}
  
// Raw PTag component
export function RawPTag({ children, className, id, html }: BaseTextProps) {
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    return (
        <p 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </p>
    );
}

// Raw SubtitleTag component
export function RawSubtitleTag({ children, className, id, html }: BaseTextProps) {
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    return (
        <p 
        className={`${combinedClassName} subtitle text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </p>
    );
}

// Raw LinkSpanTag component
export function RawLinkSpanTag({ children, className, id, html }: BaseTextProps) {
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    console.log('children: ' + children);
    return (
        <span 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
            {/* {children} */}
        </span>
    );
}

// Raw H1Tag component
export function RawH1Tag({ children, className, id, html }: BaseTextProps) {
    const combinedClassName = `${literata.className} ${className || ''}`.trim();
    return (
        <h1 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </h1>
    );
}
  
// Raw H2Tag component
export function RawH2Tag({ children, className, id, html }: BaseTextProps) {
    const [hasFadeIn, setHasFadeIn] = useState(true);
    const combinedClassName = `${literata.className} ${className || ''}`.trim();

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasFadeIn(false);
        }, 0); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <h2 className={`${combinedClassName} text-content ${hasFadeIn ? 'fade-in' : ''}`} id={id}>
            {children}
        </h2>
    );

    // const combinedClassName = `${literata.className} ${className || ''}`.trim(); // Use appropriate font
    // return (
    //   <h2 
    //     className={`${combinedClassName} text-content fade-in`} 
    //     id={id}
    //   >
    //     {html ? <SafeHTML html={childrenToString(children)} /> : children}
    //   </h2>
    // );
}

// Raw H3Tag component
export function RawH3Tag({ children, className, id, html }: BaseTextProps) {
    let combinedClassName;
    if ('className' in literata) {
        combinedClassName = `${literata.className} ${className || ''}`.trim();   
    } else {
        combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    }
    return (
        <h3 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </h3>
    );
}

// Raw H4Tag component
export function RawH4Tag({ children, className, id, html }: BaseTextProps) {
    let combinedClassName;
    if ('className' in literata) {
        combinedClassName = `${literata.className} ${className || ''}`.trim();   
    } else {
        combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    }
    
    return (
        <h4 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </h4>
    );
}

// Raw FigcaptionTag component
export function RawFigcaptionTag({ children, className, id, html }: BaseTextProps) {
    const combinedClassName = `${noto_sans_italic.className} ${className || ''}`.trim();
    return (
        <figcaption 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </figcaption>
    );
}

// Exported p tag.
export function PTag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
      <p 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
      >
        {html ? <SafeHTML html={childrenToString(children)} /> : children}
      </p>
    );
}

// Exported subtitle tag.
export function SubtitleTag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
      <p 
        className={`${combinedClassName} subtitle text-content fade-in`} 
        id={id}
      >
        {html ? <SafeHTML html={childrenToString(children)} /> : children}
      </p>
    );
}

// Exported link span tag.
export function LinkSpanTag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
        <span 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
            {/* {children} */}
        </span>
    );
}

// Exported h1 tag.
export function H1Tag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();
    const combinedClassName = `${literata.className} ${className || ''}`.trim();
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
        <h1 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </h1>
    );
}

// Exported h2 tag.
export function H2Tag({ children, className, id, html }: BaseTextProps) {
    const [hasFadeIn, setHasFadeIn] = useState(true);
    const combinedClassName = `${literata.className} ${className || ''}`.trim();
    const { isLoaded, hasLoaded } = useDelayedLoad();

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasFadeIn(false);
        }, 0); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, []);
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
        <h2 className={`${combinedClassName} text-content ${hasFadeIn ? 'fade-in' : ''}`} id={id}>
            {children}
        </h2>
    );
}

// Exported h3 tag.
export function H3Tag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();

    let combinedClassName;
    if ('className' in literata) {
        combinedClassName = `${literata.className} ${className || ''}`.trim();   
    } else {
        combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    }
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    <h3 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
    >
        {html ? <SafeHTML html={childrenToString(children)} /> : children}
    </h3>
}

// Exported h4 tag.
export function H4Tag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();

    let combinedClassName;
    if ('className' in literata) {
        combinedClassName = `${literata.className} ${className || ''}`.trim();   
    } else {
        combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
    }
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    <h4 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
    >
        {html ? <SafeHTML html={childrenToString(children)} /> : children}
    </h4>
}

// Exported figcaption tag.
export function FigcaptionTag({ children, className, id, html }: BaseTextProps) {
    const { isLoaded, hasLoaded } = useDelayedLoad();
    const combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
  
    if (!isContentReady(isLoaded, hasLoaded)) {
      return <div className="placeholder">Loading...</div>;
    }
  
    return (
        <figcaption 
        className={`${combinedClassName} text-content fade-in`} 
        id={id}
        >
            {html ? <SafeHTML html={childrenToString(children)} /> : children}
        </figcaption>
    );
}

// // HOC with fixed component type for PTag
// const PTagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawPTag,
//     'p'
// );

// // HOC with fixed component type for SubtitleTag
// const SubtitleTagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawSubtitleTag,
//     'subtitle'
// );

// // HOC with fixed component type for LinkSpanTag
// const LinkSpanTagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawLinkSpanTag,
//     'linkSpan'
// );

// // HOC with fixed component type for H1Tag
// const H1TagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawH1Tag,
//     'h1'
// );

// // HOC with fixed component type for H2Tag
// const H2TagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawH2Tag,
//     'h2'
// );

// // HOC with fixed component type for H3Tag
// const H3TagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawH3Tag,
//     'h3'
// );

// // HOC with fixed component type for H3Tag
// const H4TagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawH4Tag,
//     'h4'
// );

// // HOC with fixed component type for FigcaptionTag
// const FigcaptionTagWithLogic = withSharedTextLogic<BaseTextProps>(
//     RawFigcaptionTag,
//     'figcaption'
// );
  
// // Export the components
// export const PTag: React.FC<BaseTextProps> = (props) => <PTagWithLogic {...props} />;
// export const SubtitleTag: React.FC<BaseTextProps> = (props) => <SubtitleTagWithLogic {...props} />;
// export const LinkSpanTag: React.FC<BaseTextProps> = (props) => <LinkSpanTagWithLogic {...props} />;
// export const H1Tag: React.FC<BaseTextProps> = (props) => <H1TagWithLogic {...props} />;
// export const H2Tag: React.FC<BaseTextProps> = (props) => <H2TagWithLogic {...props} />;
// export const H3Tag: React.FC<BaseTextProps> = (props) => <H3TagWithLogic {...props} />;
// export const H4Tag: React.FC<BaseTextProps> = (props) => <H4TagWithLogic {...props} />;
// export const FigcaptionTag: React.FC<BaseTextProps> = (props) => <FigcaptionTagWithLogic {...props} />;


// export function H2Tag({ children, className, id }: BaseTextProps) {
//     combinedClassName = `${literata.className} ${className || ''}`.trim();
//     return (
//         <h2 className={combinedClassName} id={id}>
//             {children}
//         </h2>
//     );
// }

// export function H3Tag({ children, className, fontOverride, id }: BaseTextProps) {
//     if (fontOverride == true) {
//         combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
//     } else {
//         combinedClassName = `${literata.className} ${className || ''}`.trim();
//     }
//     return (
//         <h3 className={combinedClassName} id={id}>
//             {children}
//         </h3>
//     );
// }

// export function H4Tag({ children, className, fontOverride, id }: BaseTextProps) {
//     if (fontOverride == true) {
//         combinedClassName = `${noto_sans.className} ${className || ''}`.trim();
//     } else {
//         combinedClassName = `${literata.className} ${className || ''}`.trim();
//     }
//     return (
//         <h4 className={combinedClassName} id={id}>
//             {children}
//         </h4>
//     );
// }
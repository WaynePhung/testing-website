// components/withPlaceholder.tsx

import React, { useState, useEffect } from 'react';
import Placeholder from "../placeholders/placeholder";

interface WithPlaceholderProps {
  // tag: string;
  tag: 'p' | 'span' | 'subtitle' | 'figcaption' | 'h1' | 'h2' | 'h3' | 'h4';
  text: string;
  delay?: number;
  children: React.ReactNode;
}

const withPlaceholder = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithPlaceholder({
    tag,
    text,
    delay = 6000000000,
    children, 
    ...props
  }: P & WithPlaceholderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      const updateWidth = () => {
        const container = document.querySelector(`.placeholder.${tag}`);
        if (container) {
          setContainerWidth(container.clientWidth);
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);

      return () => window.removeEventListener('resize', updateWidth);
    }, [tag]);

    if (!isLoaded) {
      // return <Placeholder tag={tag} text={text} containerWidth={containerWidth} />;
      return <Placeholder tag={tag}>{children}</Placeholder>;
    }

    return <WrappedComponent {...props as P} />;
  };
};

export default withPlaceholder;
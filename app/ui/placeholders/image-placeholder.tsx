import React, { useState } from 'react';
import Image from 'next/image';
import './placeholders.css';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLoading: boolean;
}

export default function ImagePlaceholder({ src, alt, width, height, isLoading }: ImagePlaceholderProps) {
  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Render placeholder or image based on loading state
  return (
    <div className="image-container" style={{ width, height }}>
      {isLoading || !imageLoaded ? (
        <div className="image-placeholder"></div>
      ) : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        className={`image-content ${imageLoaded ? 'fade-in' : 'hidden'}`}
      />
    </div>
  );
}
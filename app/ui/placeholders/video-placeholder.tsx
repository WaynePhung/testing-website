import React, { useState } from 'react';
import './placeholders.css';

interface VideoPlaceholderProps {
  src: string;
  poster: string;
  isLoading: boolean;
}

export default function VideoPlaceholder({ src, poster, isLoading }: VideoPlaceholderProps) {
  // State to track video loading
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Handle video load completion
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Render placeholder or video based on loading state
  return (
    <div className="video-container">
      {isLoading || !videoLoaded ? (
        <div className="video-placeholder"></div>
      ) : null}
      <video
        src={src}
        poster={poster}
        onLoadedData={handleVideoLoad}
        className={`video-content ${videoLoaded ? 'fade-in' : 'hidden'}`}
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
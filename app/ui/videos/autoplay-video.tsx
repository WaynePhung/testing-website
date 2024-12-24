'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VideoGroupProps {
  dataKey: string;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
}

const VideoGroup: React.FC<VideoGroupProps> = ({
  dataKey,
  intersectionThreshold = 0.5,
  intersectionRootMargin = '0px',
}) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [hasVideos, setHasVideos] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const group = entry.target as HTMLElement;
            if (group.classList.contains('autoplayVideo')) {
              const videos = group.querySelectorAll<HTMLVideoElement | HTMLIFrameElement>('video, iframe');
              
              videos.forEach((video) => {
                if (video.getAttribute('data-key') === dataKey) {
                  if (video instanceof HTMLVideoElement) {
                    video.play().catch((error) => {
                      console.error('Error autoplaying video:', error);
                    });
                  } else if (video instanceof HTMLIFrameElement) {
                    const src = video.getAttribute('src');
                    if (src && src.includes('youtube.com')) {
                      video.setAttribute('src', `${src}&autoplay=1`);
                    }
                  }
                }
              });
            }
          }
        });
      },
      { 
        threshold: intersectionThreshold,
        rootMargin: intersectionRootMargin
      }
    );

    if (groupRef.current) {
      observer.observe(groupRef.current);
      setHasVideos(groupRef.current.querySelectorAll('video, iframe').length > 0);
    }

    return () => {
      if (groupRef.current) {
        observer.unobserve(groupRef.current);
      }
    };
  }, [dataKey, intersectionThreshold, intersectionRootMargin]);

  return (
    <div ref={groupRef} className="autoplayVideo" data-key={dataKey}>
      {!hasVideos && <p>No videos found in this group.</p>}
      <video data-key={dataKey} src="/path/to/video1.mp4" />
        <iframe data-key={dataKey} src="https://www.youtube.com/embed/VIDEO_ID" />
      <video data-key={dataKey} src="/path/to/video2.mp4" />
    </div>
  );
};

export default VideoGroup;
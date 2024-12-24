// autoplayVideoHandler.ts

import { RefObject } from 'react';

export function setupAutoplayVideoHandler(rootRef: RefObject<HTMLElement>) {
  let observer: IntersectionObserver | null = null;

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const figure = entry.target as HTMLElement;
      const rect = figure.getBoundingClientRect();
      const isInView = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isInView) {
        handleInView(figure);
      } else {
        handleOutOfView(figure);
      }
    });
  };

  const handleInView = (figure: HTMLElement) => {
    const mediaSubgroup = figure.getAttribute('data-media-subgroup');
    if (figure.classList.contains('autoplayVideo') && mediaSubgroup) {
      const matchingFigures = document.querySelectorAll(`[data-media-subgroup="${mediaSubgroup}"]`);
      matchingFigures.forEach((matchingFigure) => {
        const mediaElement = matchingFigure.querySelector('video, iframe');
        if (mediaElement instanceof HTMLVideoElement) {
          mediaElement.muted = true;
          mediaElement.play().catch((error: Error) => console.error('Error autoplaying video:', error));
        } else if (mediaElement instanceof HTMLIFrameElement) {
          const src = mediaElement.src;
          if (src.includes('youtube.com')) {
            const videoId = extractYouTubeVideoId(src);
            mediaElement.src = `${src}${src.includes('?') ? '&' : '?'}autoplay=1&mute=1&playlist=${videoId}`;
          }
        }
      });
    }
  };

  const handleOutOfView = (figure: HTMLElement) => {
    const mediaElement = figure.querySelector('video, iframe');
    if (mediaElement instanceof HTMLVideoElement) {
      mediaElement.pause();
    } else if (mediaElement instanceof HTMLIFrameElement) {
      const src = mediaElement.src;
      if (src.includes('youtube.com')) {
        mediaElement.src = src.replace(/(&|\?)autoplay=1/, '');
      }
    }
  };

  const setupObserver = () => {
    if (!rootRef.current) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when at least 10% of the element is visible
    };

    observer = new IntersectionObserver(handleIntersection, observerOptions);

    const figures = rootRef.current.querySelectorAll('figure.autoplayVideo');
    figures.forEach((figure) => {
      observer?.observe(figure);
    });
  };

  const cleanupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  return { setupObserver, cleanupObserver };
}

function extractYouTubeVideoId(url: string): string {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com(?:\.|\/))(?:embed\/|watch\?v=|v\/)([\w-]{11})(?:\S+)?/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

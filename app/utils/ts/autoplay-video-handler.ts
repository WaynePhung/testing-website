import { RefObject } from 'react';

export function setupAutoplayVideoHandler(rootRef: RefObject<HTMLElement>) {
  let observer: IntersectionObserver | null = null;
  const clickedElements = new Set<Element>();

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const mediaElement = entry.target;
      const isInView = entry.isIntersecting;

      if (isInView && !clickedElements.has(mediaElement)) {
        handleInView(mediaElement);
      } else {
        handleOutOfView(mediaElement);
      }
    });
  };

  const handleInView = (mediaElement: Element) => {
    if (mediaElement instanceof HTMLVideoElement) {
      if (!clickedElements.has(mediaElement)) {
        mediaElement.muted = true;
        mediaElement.play().catch((error: Error) => console.error('Error autoplaying video:', error));
      }
    } else if (mediaElement instanceof HTMLIFrameElement) {
      const src = mediaElement.src;
      if (src.includes('youtube.com') && !clickedElements.has(mediaElement)) {
        const videoId = extractYouTubeVideoId(src);
        mediaElement.src = `${src}${src.includes('?') ? '&' : '?'}autoplay=1&mute=1&playlist=${videoId}`;
      }
    }
  };

  const handleOutOfView = (mediaElement: Element) => {
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
      threshold: 0.5, // Adjust this threshold as needed
    };

    observer = new IntersectionObserver(handleIntersection, observerOptions);

    const figures = rootRef.current.querySelectorAll('figure.autoplayVideo');
    figures.forEach((figure) => {
      const mediaElement = figure.querySelector('video, iframe');
      if (mediaElement) {
        observer?.observe(mediaElement);
        
        mediaElement.addEventListener('click', (event) => {
          event.stopPropagation();
          clickedElements.add(mediaElement);

          const tagName = mediaElement.tagName.toLowerCase();
          // console.log(`Clicked element tag: ${tagName}`);

          if (mediaElement instanceof HTMLVideoElement) {
            mediaElement.removeAttribute('autoplay');
            mediaElement.muted = false;
            mediaElement.pause();
            const newVideo = mediaElement.cloneNode(true) as HTMLVideoElement;
            newVideo.removeAttribute('autoplay');
            mediaElement.parentNode?.replaceChild(newVideo, mediaElement);
          } else if (mediaElement instanceof HTMLIFrameElement) {
            const src = mediaElement.src;
            if (src.includes('youtube.com')) {
              mediaElement.src = src.replace(/(&|\?)autoplay=1/, '').replace(/(&|\?)mute=1/, '') + '&controls=1';
            }
          }
        }, { once: true });
      }
    });
  };

  const cleanupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    clickedElements.clear();
  };

  return { setupObserver, cleanupObserver };
}

function extractYouTubeVideoId(url: string): string {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com(?:\.|\/))(?:embed\/|watch\?v=|v\/)([\w-]{11})(?:\S+)?/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}
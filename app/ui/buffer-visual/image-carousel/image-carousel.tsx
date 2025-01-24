// components/ImageCarousel.tsx

import React, { useEffect, useState, useCallback } from 'react';
import './image-carousel.css';

// Define the structure for each image
interface ImageItem {
  src: string;
  alt: string;
}

// Props for the ImageCarousel component
interface ImageCarouselProps {
  images: ImageItem[];
  displayTime: number; // Time each image is displayed in milliseconds
  delayTime: number;   // Delay before the next image starts entering
  resetTime: number;   // Time the image stays in reset state before entering
}

export default function ImageCarousel({ images, displayTime, delayTime, resetTime }: ImageCarouselProps) {
  // State to hold the current order of images
  const [imageOrder, setImageOrder] = useState<number[]>([]);
  // Index of the current image in the imageOrder array
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // State of the current image: 'hidden', 'reset', 'enter', or 'exit'
  const [imageState, setImageState] = useState<'hidden' | 'reset' | 'enter' | 'exit'>('hidden');

  // Function to shuffle the array of image indices
  const shuffleImages = useCallback(() => {
    const shuffled = [...Array(images.length)].map((_, i) => i).sort(() => Math.random() - 0.5);
    return shuffled;
  }, [images.length]);

  // Function to get the next valid image order
  const getNextImageOrder = useCallback((lastOrder: number[]) => {
    let newOrder: number[];
    do {
      newOrder = shuffleImages();
    } while (newOrder[0] === lastOrder[lastOrder.length - 1]);
    return newOrder;
  }, [shuffleImages]);

  // Initialize or update the image order
  useEffect(() => {
    setImageOrder(shuffleImages());
  }, [shuffleImages]);

  // Main effect for managing the image carousel
  useEffect(() => {
    if (imageOrder.length === 0) {
      setImageOrder(shuffleImages());
      return;
    }

    const transitionCycle = () => {
      setImageState('exit');
      setTimeout(() => {
        setImageState('reset');
        setTimeout(() => {
          // Move to the next image or start a new cycle
          if (currentIndex === imageOrder.length - 1) {
            setImageOrder(prevOrder => getNextImageOrder(prevOrder));
            setCurrentIndex(0);
          } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
          }
          setTimeout(() => {
            setImageState('enter');
          }, resetTime);
        }, 50); // Short delay to ensure 'reset' class is applied
      }, 500); // Duration of exit transition
    };

    // Start with the image entering if it's the first cycle
    if (imageState === 'hidden') {
      setImageState('reset');
      setTimeout(() => setImageState('enter'), resetTime);
    }

    const interval = setInterval(transitionCycle, displayTime + delayTime);

    return () => clearInterval(interval);
  }, [currentIndex, displayTime, delayTime, resetTime, imageOrder, getNextImageOrder, shuffleImages]);

  // Render a placeholder if image order is not yet set
  if (imageOrder.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-placeholder">Loading...</div>
      </div>
    );
  }

  // Get the current image based on the current index in the image order
  const currentImage = images[imageOrder[currentIndex]];

  return (
    <div className="carousel-container">
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className={`carousel-image ${imageState}`}
      />
      <div className="carousel-overlay"></div>
    </div>
  );
}

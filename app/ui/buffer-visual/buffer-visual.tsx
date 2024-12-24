import React from 'react';
import LoadingSpinner from "./loading-spinner/loading-spinner";
import ImageCarousel from "./image-carousel/image-carousel";
// import "./buffer-visual.css";

// Sample array of image URLs
// const images = [
//   "/icons/arrow-right.svg",
//   "/icons/video.svg",
//   "/icons/thought-bubble.svg",
//   "/icons/play.svg",
//   "/icons/pause.svg"
// ];

// Define the images with their sources and alt texts
const carouselImages = [
  {src:"/icons/arrow-right.svg", alt:"Description of image 1." },
  {src:"/icons/video.svg", alt:"Description of image 2." },
  {src:"/icons/thought-bubble.svg", alt:"Description of image 3." },
  {src:"/icons/play.svg", alt:"Description of image 4." },
  {src:"/icons/pause.svg", alt:"Description of image 5." }
  // Add more images as needed
];

export default function BufferVisual() {
  return (
    <figure className="buffer-visual">
      <LoadingSpinner>
      </LoadingSpinner>
      <ImageCarousel images={carouselImages} displayTime={2000} delayTime={500} resetTime={500} />
    </figure>
  );
}

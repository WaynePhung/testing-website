export default function imageLoader({ src, width, quality }) {
    // Check if the src is an external URL
    if (src.startsWith('http') || src.startsWith('https')) {
      return src;
    }
    
    // For internal images, let Next.js handle optimization
    return `${src}`;
}  
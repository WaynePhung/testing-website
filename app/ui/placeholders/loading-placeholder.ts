import { useState, useEffect } from 'react';

// Default delay in seconds
const DEFAULT_DELAY = 60000000;

// Interface for the hook's return value
interface DelayedLoadState {
  isLoaded: boolean;
  hasLoaded: boolean;
}

// Custom hook for delayed loading
export function useDelayedLoad(delay: number = DEFAULT_DELAY): DelayedLoadState {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const delayMs = delay * 1000;
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setHasLoaded(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delay]);

  return { isLoaded, hasLoaded };
}

// Utility function to check if content is ready to be displayed
export function isContentReady(isLoaded: boolean, hasLoaded: boolean): boolean {
  return isLoaded && hasLoaded;
}

import { useState, useEffect } from 'react';
import { indefinite } from "@/app/utils/ts/exported-constants";

interface UseDelayedLoadProps {
  delay?: number;
  mediaType?: string;
  mediaAlias?: string;
}

export const useDelayedLoad = ({ delay = indefinite, mediaType, mediaAlias }: UseDelayedLoadProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const delayMS = delay * 1000;
  useEffect(() => {
    setIsLoaded(false);
    // const loadedState = localStorage.getItem(`${mediaType}-${mediaAlias}-loaded`);
    setTimeout(() => {
      // if (loadedState === 'true') {
        setIsLoaded(true);
        // setHasLoaded(true);
      // }
    }, delayMS);
  }, [delayMS]);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
      // setHasLoaded(true);
      // localStorage.setItem(`${mediaType}-${mediaAlias}-loaded`, 'true');
    }, delay);
  };

  return { isLoaded, hasLoaded, handleLoad };
};

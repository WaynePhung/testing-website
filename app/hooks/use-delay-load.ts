import { useState, useEffect, useCallback, useRef } from 'react';
import { indefinite } from "@/app/utils/ts/exported-constants";

interface BreakpointCondition {
  minWidth?: number;
  maxWidth?: number;
}

interface UseDelayedLoadProps {
  delay?: number;
  breakpoint?: BreakpointCondition;
}

// Debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useDelayedLoad = ({ delay = indefinite, breakpoint }: UseDelayedLoadProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const delayMS = delay * 1000;

  const checkVisibility = useCallback(() => {
    if (!breakpoint) return true;
    const { minWidth, maxWidth } = breakpoint;
    const width = window.innerWidth;
    return (minWidth === undefined || width >= minWidth) && (maxWidth === undefined || width <= maxWidth);
  }, [breakpoint]);

  const debouncedCheckVisibility = useRef(
    debounce(() => {
      const result = checkVisibility();
      setIsVisible(result);
      return result;
    }, 0)
  ).current;

  useEffect(() => {
    const handleResize = () => {
      debouncedCheckVisibility();
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedCheckVisibility]);


  useEffect(() => {
    if (isVisible && !hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        setHasLoaded(true);
      }, delayMS);

      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setIsLoaded(false);
    }
  }, [isVisible, hasLoaded, delayMS]);

  return { isLoaded, hasLoaded, isVisible };
};

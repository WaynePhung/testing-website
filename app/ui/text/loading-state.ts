// utils/loadingState.ts

import { useState, useEffect } from 'react';

export function useLoadingState(delayTimer: number = 600000000) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delayTimer * 1000);

    return () => clearTimeout(timer);
  }, [delayTimer]);

  return isLoaded;
}

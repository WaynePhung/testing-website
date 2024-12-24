'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import javascript from "@/app/utils/js/global-layout";

const NavigationHandler: React.FC = () => {
    const router = useRouter();
  
    useEffect(() => {
      const handleRouteChange = () => {
        javascript();
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router]);
  
    return null;
  };
  
  export default NavigationHandler;
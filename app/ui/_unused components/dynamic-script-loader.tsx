'use client'

import { useEffect } from 'react';
import loadScript from "../../utils/js/load-script";

export default function DynamicScriptLoader() {
  useEffect(() => {
    loadScript('@/app/utils/js/global-layout.js')
      .then(() => {
        // console.log('Script loaded successfully.');
        // You can now use functions or variables from the loaded script
      })
      .catch((error) => {
        console.error('Failed to load script:', error);
      })
  }, []);

  return null;
}

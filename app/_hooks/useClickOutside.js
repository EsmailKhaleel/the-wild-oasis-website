'use client';

import { useEffect } from 'react';

export function useClickOutside(refs, handler, listenCapture = false) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = refs.every(ref => 
        ref.current && !ref.current.contains(event.target)
      );

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside, listenCapture);
    
    return () => {
      document.removeEventListener('click', handleClickOutside, listenCapture);
    };
  }, [refs, handler, listenCapture]);
}

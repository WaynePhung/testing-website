//asidePosition

interface AsidePosition {
    isWithinBounds: boolean;
  }
  
  export function updateAsidePosition(): AsidePosition {
    const bodyContent = document.querySelector('section.bodyContent');
    const aside = document.querySelector('aside');
  
    if (!bodyContent || !aside) {
      return { isWithinBounds: false }
    };
  
    const asideRect = aside.getBoundingClientRect();
    const bodyContentRect = bodyContent.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
    const isWithinbodyContent = asideRect.top >= bodyContentRect.top && asideRect.bottom <= bodyContentRect.bottom;
    const isWithinViewport = asideRect.top < windowHeight && asideRect.bottom > 0;
    const isWithinBounds = isWithinbodyContent && isWithinViewport;

    if (window.innerWidth > 1024) {
      if (isWithinbodyContent) {
        aside.style.position = "sticky";
      } else {
        aside.style.position = "";
      }
    } else {
      
    }

    // console.log('isWithinBounds: ' + isWithinBounds);
  
    return { isWithinBounds };
  }
  
  export function throttle <T extends (...args: any[]) => any> (
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }
  
  
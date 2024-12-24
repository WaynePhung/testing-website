import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkContextType {
  clickCounts: Record<string, number>;
  lastClickedHref: string | null;
  maxClicks: number;
  resetClickCount: (href: string) => void;
  incrementClickCount: (href: string) => void;
}

const defaultContextValue: LinkContextType = {
  clickCounts: {},
  lastClickedHref: null,
  maxClicks: 1,
  resetClickCount: () => {},
  incrementClickCount: () => {},
};

const LinkContext = createContext<LinkContextType>(defaultContextValue);

export function createCustomLink() {
  function LinkProvider({ children, maxClicks = 1 }: { children: ReactNode; maxClicks?: number }) {
    const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
    const [lastClickedHref, setLastClickedHref] = useState<string | null>(null);

    const resetClickCount = (href: string) => {
      setClickCounts((prev) => ({ ...prev, [href]: 0 }));
      setLastClickedHref(href);
    };

    const incrementClickCount = (href: string) => {
      setClickCounts((prev) => ({ ...prev, [href]: (prev[href] || 0) + 1 }));
    };

    const value: LinkContextType = {
      clickCounts,
      lastClickedHref,
      maxClicks,
      resetClickCount,
      incrementClickCount,
    };

    return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
  }

  function CustomLink({ href, children, onClick, ...props }: { href: string; children: ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const { clickCounts, lastClickedHref, maxClicks, resetClickCount, incrementClickCount } = useContext(LinkContext);

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href !== lastClickedHref) {
        resetClickCount(href);
      }

      incrementClickCount(href);

      if ((clickCounts[href] || 0) < maxClicks) {
        onClick && onClick(e);
      } else {
        e.preventDefault();
        console.log(`Clicked ${maxClicks} times. Click ignored.`);
      }
    }, [href, lastClickedHref, clickCounts, maxClicks, onClick, resetClickCount, incrementClickCount]);

    return (
      <NextLink href={href} passHref>
        <a onClick={handleClick} {...props}>{children}</a>
      </NextLink>
    );
  }

  return { LinkProvider, CustomLink };
}

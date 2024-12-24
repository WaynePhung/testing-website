// ScrollContext.tsx
"use client";

import React, { createContext, useContext, useCallback, useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ScrollContextType {
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeSection: string | null;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

// Create a separate component for search params
const SearchParamsComponent: React.FC<{ children: (searchParams: ReturnType<typeof useSearchParams>) => React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Wrap the logic that uses searchParams in a separate component
  const ScrollProviderInner: React.FC = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsComponent>
          {(searchParams) => {
            const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
              e.preventDefault();
              const id = href.slice(1);
              const element = document.getElementById(id);
              if (element) {
                // ... (scrolling logic remains unchanged)

                // Update URL without full page reload
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set('section', id);
                const newPathname = `${pathname}?${newParams.toString()}`;
                router.push(newPathname, { scroll: false });
                
                setActiveSection(id);
              }
            }, [router, pathname, searchParams]);

            return (
              <ScrollContext.Provider value={{ handleScroll, activeSection }}>
                {children}
              </ScrollContext.Provider>
            );
          }}
        </SearchParamsComponent>
      </Suspense>
    );
  };

  useEffect(() => {
    // ... (intersection observer logic remains unchanged)
  }, []);

  return <ScrollProviderInner />;
};
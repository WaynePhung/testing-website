// ProgressContext.tsx
import React, { createContext, useContext } from 'react';

interface ProgressContextType {
  progress: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<ProgressContextType & { children: React.ReactNode }> = ({ children, progress }) => {
  return (
    <ProgressContext.Provider value={{ progress }}>
      {children}
    </ProgressContext.Provider>
  );
};
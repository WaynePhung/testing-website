import React, { ReactElement,  useState, useEffect } from 'react';
import { SafeHTML } from "./safe-html";
import { childrenToString } from "./childrenToString";

export function getPaddingBottom (fontSize: number, coefficient: number) {
  return fontSize * coefficient;
}

// Shared state interface
export interface SharedTextState {
  isLoaded: boolean;
  hasLoaded: boolean;
  isInitialLoading: boolean;
  isRouteChanging: boolean;
  isRefreshing: boolean;
  showContent: boolean;
  lineCount: number;
  screenWidth: number;
  getString: string;
  containerWidth: number;
}

// Interface for text component configuration
interface TextComponentConfig {
  fontSize: number;
  charWidthCoefficient: number;
  lineHeight: number; // Added for placeholder height calculation
  paddingBottom: number;
}

// Configuration for different text components and screen widths
const textComponentConfigs: Record<string, Record<number, TextComponentConfig>> = {
  p: {
    0: { fontSize: 18, charWidthCoefficient: 0.55, lineHeight: 1.6, paddingBottom: getPaddingBottom(18, 0.35) },
    1024: { fontSize: 20, charWidthCoefficient: 0.55, lineHeight: 1.6, paddingBottom: getPaddingBottom(20, 0.35) },
  },
  subtitle: {
    0: { fontSize: 20, charWidthCoefficient: 0.55, lineHeight: 1.5, paddingBottom: getPaddingBottom(20, 0.4) },
    1024: { fontSize: 24, charWidthCoefficient: 0.55, lineHeight: 1.5, paddingBottom: getPaddingBottom(20, 0.4) },
  },
  linkSpan: {
    0: { fontSize: 16, charWidthCoefficient: 0.55, lineHeight: 1.5, paddingBottom: getPaddingBottom(16, 0) },
    1024: { fontSize: 16, charWidthCoefficient: 0.55, lineHeight: 1.5, paddingBottom: getPaddingBottom(16, 0) },
  },
  h1: {
    0: { fontSize: 48, charWidthCoefficient: 0.6, lineHeight: 1.2, paddingBottom: getPaddingBottom(18, 0.75) },
    1024: { fontSize: 80, charWidthCoefficient: 0.6, lineHeight: 1.15, paddingBottom: getPaddingBottom(20, 0.75) },
  },
  h2: {
    0: { fontSize: 36, charWidthCoefficient: 0.6, lineHeight: 1.25, paddingBottom: getPaddingBottom(16, 1) },
    1024: { fontSize: 52, charWidthCoefficient: 0.6, lineHeight: 1.23, paddingBottom: getPaddingBottom(16, 1) },
  },
  h3: {
    0: { fontSize: 28, charWidthCoefficient: 0.6, lineHeight: 1.3, paddingBottom: getPaddingBottom(18, 0.55) },
    1024: { fontSize: 36, charWidthCoefficient: 0.6, lineHeight: 1.3333, paddingBottom: getPaddingBottom(20, 0.55) },
  },
  h4: {
    0: { fontSize: 24, charWidthCoefficient: 0.6, lineHeight: 1.375, paddingBottom: getPaddingBottom(18, 0.45) },
    1024: { fontSize: 24, charWidthCoefficient: 0.6, lineHeight: 1.3333, paddingBottom: getPaddingBottom(20, 0.45) },
  },
  figcaption: {
    0: { fontSize: 16, charWidthCoefficient: 0.6, lineHeight: 1.5, paddingBottom: getPaddingBottom(24, 0.75) },
    1024: { fontSize: 16, charWidthCoefficient: 0.6, lineHeight: 1.5, paddingBottom: getPaddingBottom(24, 0.75) },
  }
  // Add more configurations for other heading tags as needed
};

/**
 * Get the appropriate configuration based on screen width
 * @param componentType - The type of text component (e.g., 'p', 'h1')
 * @param screenWidth - The current screen width
 * @returns The configuration for the given component type and screen width
 */
export function getConfig(componentType: string, screenWidth: number): TextComponentConfig {
  const defaultConfig: TextComponentConfig = {
    fontSize: 16,
    charWidthCoefficient: 0.55,
    lineHeight: 1.5,
    paddingBottom: 0
  };

  // Check if the componentType exists in textComponentConfigs
  if (!(componentType in textComponentConfigs)) {
    console.warn(`Configuration for "${componentType}" not found. Using default config.`);
    return defaultConfig;
  }

  const configs = textComponentConfigs[componentType];
  const breakpoints = Object.keys(configs).map(Number).sort((a, b) => b - a);
  const breakpoint = breakpoints.find(bp => screenWidth >= bp) || breakpoints[breakpoints.length - 1];
  return configs[breakpoint];
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('');
  }
  if (React.isValidElement(node)) {
    const element = node as ReactElement;
    if (element.type === 'br') {
      return '<br>';
    }
    if ('props' in element) {
      const props = element.props as { children?: React.ReactNode };
      if ('children' in props) {
        return extractTextContent(props.children);
      }
    }
  }
  return '';
}

/**
 * Calculates the number of lines for a given text
 * @param children - The React children to render
 * @param config - The configuration for the text component
 * @param containerSelector - The CSS selector for the container element
 * @returns The calculated number of lines
 */
export function calculateLineCount(
  children: React.ReactNode,
  config: TextComponentConfig,
  containerSelector: string = '.placeholder'
): { lineCount: number; getString: string; containerWidth: number } {
  // Get the container width
  const containerWidth = document.querySelector(containerSelector)?.clientWidth || 0;
  // console.log('calculateLineCount - containerWidth: ' + containerWidth);
  
  // Calculate the number of characters that can fit in one line
  const charsPerLine = Math.floor(containerWidth / (config.fontSize * config.charWidthCoefficient));
  // console.log('calculateLineCount - config.fontSize: ' + config.fontSize);
  // console.log('calculateLineCount - config.charWidthCoefficient: ' + config.charWidthCoefficient);
  // console.log('calculateLineCount - charsPerLine: ' + charsPerLine);

  // Check if children is a SafeHTML component or extract text content
  let getString: string = '';
  if (React.isValidElement(children)) {
    const element = children as ReactElement;
    // console.log('calculateLineCount - element.type: ' + element.type);
    if (element.type === SafeHTML) {
      const safeHTMLProps = element.props as { html?: string };
      getString = safeHTMLProps.html || '';
      // console.log('calculateLineCount - children: ' + children);
    } else {
      // getString = element.props as string || '';
      getString = extractTextContent(children);
      // console.log('calculateLineCount - getString: ' + getString);
    }
  } else {
    // console.log('calculateLineCount - children: ' + children);
    getString = extractTextContent(children);
  }

  // Ensure getString is not empty
  if (getString.trim() === '') {
    // console.log('calculateLineCount - getString is empty.');
    getString = ' '; // Use a space to ensure at least one line
  }
  // console.log('calculateLineCount - getString from loading-content: ' + getString);
  
  // Split the string by line breaks
  const lines = getString.split(/<br><br>|<br>|"noWidow"/);
  
  // Calculate the number of lines and log each line for simulation
  const lineCount = lines.reduce((count, line, index) => {
    const linesInSegment = Math.ceil(line.length / charsPerLine);
    // console.log(`Placeholder line ${index + 1}: ${line.substring(0, 20)}${line.length > 20 ? '...' : ''}`);
    // console.log(`Placeholder line ${index + 1}: ${line}`);
    return count + linesInSegment;
  }, 0);
  // console.log('Total line count: ' + lineCount);
  // console.log('calculateLineCount - total line count: ' + lineCount);

  
  
  // Clamp the line count between 1 and 20
  const clampedLineCount = Math.min(Math.max(lineCount, 1), 20);
  // console.log('calculateLineCount - clampedLineCount: ' + clampedLineCount);
  // // Calculate the number of lines based on text length
  // const textLines = Math.ceil(getString.length / charsPerLine);
  // console.log('getString.length: ' + getString.length);
  // console.log('charsPerLine: ' + charsPerLine);
  // console.log('textLines: ' + textLines);
  
  // // Calculate the total line count, clamped between 1 and 20
  // const lineCount = Math.min(Math.max(textLines + brCount, 1), 20);
  // console.log('Total line count: ' + Math.min(Math.max(textLines + brCount, 1), 20));
  
  return { lineCount: clampedLineCount, getString, containerWidth };
}

/**
 * Custom hook for shared text logic
 * @param children - The React children to render
 * @param componentType - The type of text component (e.g., 'p', 'h1')
 * @returns An object containing the shared state and handler functions
 */
export function useSharedTextLogic(children: React.ReactNode, componentType: string) {
  // Initialize shared state
  const [state, setState] = useState<SharedTextState>({
    isLoaded: false,
    hasLoaded: false,
    isInitialLoading: true,
    isRouteChanging: false,
    isRefreshing: false,
    showContent: false,
    lineCount: 0,
    getString: '',
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    containerWidth: 0,
  });

  // Effect for initial loading simulation
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        isInitialLoading: false,
        showContent: true,
      }));
    // }, 0); // 0 seconds for initial load
    }, 5000); // 5 seconds for initial load
    // }, 60000); // 60 seconds for initial load
    // }, 6000000000); // plenty of seconds for initial load
    return () => clearTimeout(loadTimer);
  }, []);

  // Effect for screen width and line count calculation
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const config = getConfig(componentType, screenWidth);
      // console.log('children: ' + children);
      // console.log('config: ' + config);
      const { lineCount, getString, containerWidth } = calculateLineCount(children, config);
      setState(prevState => ({ ...prevState, screenWidth, lineCount, getString, containerWidth }));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [children, componentType]);

  // Function to handle route change
  const handleRouteChange = () => {
    setState(prevState => ({ ...prevState, isRouteChanging: true, showContent: false }));
    setTimeout(() => {
      setState(prevState => ({ ...prevState, isRouteChanging: false, showContent: true }));
    }, 3000); // 3 seconds for route change
    // }, 60000); // 60 seconds for initial load
  };

  // Function to handle refresh
  const handleRefresh = () => {
    setState(prevState => ({ ...prevState, isRefreshing: true, showContent: false }));
    setTimeout(() => {
      setState(prevState => ({ ...prevState, isRefreshing: false, showContent: true }));
    }, 2000); // 2 seconds for refresh
    // }, 60000); // 60 seconds for initial load
  };

  return { state, handleRouteChange, handleRefresh };
}
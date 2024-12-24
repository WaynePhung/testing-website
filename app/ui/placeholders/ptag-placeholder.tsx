import React, { useState, useEffect } from 'react';
import { PTag } from "../text/text-tags";
import './placeholders.scss';

interface PTagPlaceholderProps {
  content: string;
  contentToLoad: string;
  isLoading: boolean;
}

export default function PTagPlaceholder({ content, contentToLoad, isLoading }: PTagPlaceholderProps) {
  const [showContent, setShowContent] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const calculateLineCount = () => {
      const containerWidth = document.querySelector('.text-container')?.clientWidth || 0;
      // const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const fontSize = 20;
      const charsPerLine = Math.floor(containerWidth / (fontSize * 0.55)); // 0.55 is the coefficient for Noto Sans font, this value must change if changing the font family.
      const brCount = (contentToLoad.match(/<br><br>/g) || []).length;
      const textLines = Math.ceil(contentToLoad.length / charsPerLine);
      // console.log('containerWidth: ' + containerWidth);
      // console.log('fontSize: ' + fontSize);
      // console.log('charsPerLine: ' + charsPerLine);
      // console.log('contentToLoad.length: ' + contentToLoad.length);
      // console.log('brCount: ' + brCount);
      // console.log('textLines: ' + textLines);
      // console.log('calculateLineCount: ' + Math.min(Math.max(textLines + brCount, 1), 20));
      return Math.min(Math.max(textLines + brCount, 1), 20);
    };

    setLineCount(calculateLineCount());

    window.addEventListener('resize', () => setLineCount(calculateLineCount()));
    return () => window.removeEventListener('resize', () => setLineCount(calculateLineCount()));
  }, [contentToLoad]);

  return (
    <div className="text-container">
      {isLoading || !showContent ? (
        <div className={`ptag-placeholder lines-${lineCount}`}>
          {Array(lineCount).fill(0).map((_, index) => (
            <div key={index} className="placeholder-line"></div>
          ))}
        </div>
      ) : (
        <PTag className="text-content fade-in">{content}</PTag>
      )}
    </div>
  );
}

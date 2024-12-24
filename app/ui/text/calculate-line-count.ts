import { childrenToString } from "./childrenToString";

interface LineCountParams {
  children: React.ReactNode;
  fontSize: number;
  fontCoefficient: number;
  containerWidth?: number;
  maxLines?: number;
}

export function calculateLineCount({
  children,
  fontSize,
  fontCoefficient,
  containerWidth = 0,
  maxLines = 20
}: LineCountParams): number {
  const actualContainerWidth = containerWidth || document.querySelector('.placeholder')?.clientWidth || 0;
  const charsPerLine = Math.floor(actualContainerWidth / (fontSize * fontCoefficient));
  const getString = childrenToString(children);
  const brCount = (getString.match(/<br><br>/g) || []).length;
  const textLines = Math.ceil(getString.length / charsPerLine);
  return Math.min(Math.max(textLines + brCount, 1), maxLines);
}

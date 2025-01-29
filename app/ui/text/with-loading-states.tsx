import React from 'react';
import { useDelayedLoad, isContentReady } from "../placeholders/loading-placeholder";
import { getConfig, SharedTextState, useSharedTextLogic } from "./loading-content";
import { SafeHTML } from "../../ui/text/safe-html";
import { childrenToString } from "./childrenToString";

// Uncomment this import later.
// import { useVisibilityLoader } from "@/app/utils/ts/check-viewport";


// Interface for the props of the wrapped component
interface WrappedComponentProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    fontOverride?: boolean;
    html?: boolean;
    state: SharedTextState;
}
  
// Higher-order component
export function withSharedTextLogic<P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P & { state: SharedTextState }>,
  componentType: string
) {
  return function WithSharedTextLogic(props: P) {
    const { children, html, ...rest } = props;
    // console.log('children to props: ' + children);
    // console.log('html to props: ' + html);
    const { state, handleRouteChange, handleRefresh } = useSharedTextLogic(children, componentType);
    // console.log('state to useSharedTextLogic: ' + state);
    // const { ref, isVisible, isLoaded } = useVisibilityLoader();

    const { isLoaded, hasLoaded } = useDelayedLoad();

    // Uncomment this line later.
    // const { ref, isVisible, isLoaded } = useVisibilityLoader();
    
    // Delete this line later.
    // const [showPlaceholder, setShowPlaceholder] = useState(!isLoaded && !isVisible);

    const config = getConfig(componentType, state.screenWidth);

    // Uncomment this code block later.
    // useEffect(() => {
    //   if (isLoaded || isVisible) {
    //     setShowPlaceholder(false);
    //   }
    // }, [isLoaded, isVisible]);

    const renderPlaceholder = () => {
      const safeLineCount = Math.max(1, Math.floor(state.lineCount) || 0);
      // console.log("state: " + state);
      // console.log("state.containerWidth: " + state.containerWidth);
      const charsPerLine = Math.floor(state.containerWidth / (config.fontSize * config.charWidthCoefficient));
      // console.log("charsPerLine: " + charsPerLine);
      // console.log("state.getString: " + (state.getString ? state.getString : "empty"));
      
      // Ensure we always have at least one line
      const lines = state.getString.split(/<br><br>|<br>|"noWidow"/).filter(line => line.trim() !== '');
      if (lines.length === 0) lines.push(state.getString);
    
      return (
        <div className={`placeholder lines-${safeLineCount}`}>
          {lines.flatMap((line, lineIndex) => {
            // console.log("line.length: " + line.length);
            // console.log("line.length: " + line.length);
            const lineChunks = Math.max(1, Math.ceil(line.length / charsPerLine));
            // console.log("lineChunks: " + lineChunks);
            return Array.from({ length: lineChunks }, (_, chunkIndex) => {
              const chunkText = line.slice(chunkIndex * charsPerLine, (chunkIndex + 1) * charsPerLine);
              const lineWidth = Math.min(state.containerWidth, Math.max(1, chunkText.length) * config.fontSize * config.charWidthCoefficient);
              
              return (
                <div 
                  key={`${lineIndex}-${chunkIndex}`}
                  className={`${componentType}-placeholder-line`}
                  style={{ 
                    height: `${config.fontSize * config.lineHeight}px`,
                    marginBottom: `${config.paddingBottom}px`,
                    maxWidth: `${lineWidth}px`
                  }}
                ></div>
              );
            });
          })}
        </div>
      );
    };
    
    const renderContent = () => (
      <WrappedComponent {...rest as P} state={{ isLoaded, hasLoaded }} html={html}>
        {html ? <SafeHTML html={childrenToString(children)} /> : children}
      </WrappedComponent>
    );

    return (
      <React.Fragment>
        {!isContentReady(isLoaded, hasLoaded) && renderPlaceholder()}
        {isContentReady(isLoaded, hasLoaded) && renderContent()}
      </React.Fragment>
    );

    // const renderContent = () => (
    //   <WrappedComponent {...rest as P} state={state} html={html}>
    //     {html==true ? <SafeHTML html={childrenToString(children)} /> : children}
    //     {/* {children} */}
    //   </WrappedComponent>
    // );

    // // Uncomment this code block later.
    // return (
    //   <React.Fragment>
    //     {showPlaceholder && <div ref={ref}>{renderPlaceholder()}</div>}
    //     {!showPlaceholder && renderContent()}
    //   </React.Fragment>
    // );

    // Comment these two code blocks later.

    // Determine what to render based on loading state
    if (!state.showContent || state.isInitialLoading || state.isRouteChanging || state.isRefreshing) {
      return (
        <div className="text-container">
          {renderPlaceholder()}
        </div>
      );
    }

    // Render just the content (without the text-container) when fully loaded
    return renderContent();
  };
}
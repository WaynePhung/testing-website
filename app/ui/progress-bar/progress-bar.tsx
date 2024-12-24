import { scrollProgressBar } from "./../../utils/ts/scroll-progress-bar";
import { caseStudyPaths, otherPagePaths } from "@/app/utils/ts/exported-constants";

// interface ProgressBarProps {
//   caseStudyPaths: string[];
// }

export default function ProgressBar() {
  const progress = scrollProgressBar(caseStudyPaths);

  return (
    /* Horizontal progress bar that only appears on tablet/desktop screen sizes. */
    <div className="progressContainer">
        {/* Indicator that dynamically changes in length based on how far down the person has scrolled down the web page. */}
      <div className="progressBar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

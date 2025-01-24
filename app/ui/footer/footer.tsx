import { H3Tag, H4Tag, PTag, SubtitleTag } from "./../../ui/text/text-tags";
import { noto_sans } from "../../utils/text-styling/fonts";
import Link from "next/link";
import { LinkComponent } from "../links/link";
import ButtonComponent from "../buttons/button";
import GlobalNavComponents from "../navigation/global-nav-components";
// import Button_LinkedIn from "../buttons/button-linkedIn";
// import Button_Email from "../buttons/button-email";

interface Footer {
    pageString?: "home" | "global";
}

export default function Footer({pageString} : Footer) {
  return (
    <footer role="footer" aria-label="footer">
        <GlobalNavComponents />
    </footer>
  );
}
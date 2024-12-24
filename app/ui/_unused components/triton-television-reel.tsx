import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import ButtonSeeCaseStudy from "./button-see-case-study";

export default function TTVReel() {
    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <h3 className={literata.className}>Triton Television Reel</h3>
                <h4 className={`${literata.className} tags`}>Video Editing</h4>
                <p className={noto_sans.className}>This video showcases student projects within Triton Television (TTV), a film and media production student organization at University of California - San Diego.</p>
                <button>
                    <Link href="/triton-television-reel" rel="external">
                        <ButtonSeeCaseStudy />
                    </Link>
                </button>
            </article>
            <figure>
                <Link href="/triton-television-reel" rel="external" className="ratio-16-9 shadow">
                    <iframe className="ratio-16-9" src="https://www.youtube.com./embed/uQnnd5la29Q?si=hOcClVyV_TdNKLPN&playsinline=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Link>
            </figure>
        </article>
    );
}
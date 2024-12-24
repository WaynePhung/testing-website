import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import Image from "next/image";
import Link from "next/link";
import FigureImageVideo from "../media/media-global";
import { H3Tag, H4Tag, PTag } from "./../../ui/text/text-tags";
import ButtonSeeCaseStudy from "./button-see-case-study";


export default function AutoPG() {
    return (
        <article className="grid-default-1400 grid-case-study-preview">
            <article>
                <H3Tag>Automation Playground</H3Tag>
                <H4Tag className={"tags"}>Web Design, Prototyping</H4Tag>
                <PTag>
                    Automation Playground is a research subgroup of UC San Diego's Design Lab.
                    <br />
                    Helped to spearhead a web design project to showcase the research group for the former founder.
                </PTag>
                <button>
                    <Link href="/automation-playground" rel="external">
                        <ButtonSeeCaseStudy />
                    </Link>
                </button>
            </article>
            <FigureImageVideo mediaGroup="ap" mediaType="image" mediaAlias="main" shadow="true"></FigureImageVideo>
            {/* <figure>
                <Link href="/automation-playground" rel="external">
                    <picture>
                        <Image src={images["automation-playground"]["main"]} width={1027} height={501} alt="" loading="lazy" />
                    </picture>
                </Link>
            </figure> */}
        </article>
    );
}
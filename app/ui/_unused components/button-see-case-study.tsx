import { noto_sans } from "@/app/utils/text-styling/fonts";
import { icons } from "../icons/images-icons";
import Image from "next/image";
import { size_space_num } from "../../utils/size-spacing/nums-size-space";

export default function ButtonSeeCaseStudy() {
    return (
        <>
            <span className={noto_sans.className}>See Case Study</span>
            <picture>
                <Image src={icons["arrow-right"]} width={size_space_num["l-num"]} height={size_space_num["l-num"]} alt="" loading="lazy" />
            </picture>
        </>
    );
}
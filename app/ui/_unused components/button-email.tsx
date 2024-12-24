import { noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import Image from "next/image";
import { icons } from "../icons/images-icons";
import { size_space_num } from "../../utils/size-spacing/nums-size-space";

export default function Button_Email() {
    return(
        <button id="emailButton">
            <Link href="mailto:waynephung1@gmail.com" rel="external" target="_blank">
                <picture className="icon ratio-4-3">
                    <Image src={icons.email} width={size_space_num["l-num"]} height={size_space_num["l-num"]} alt="" loading="lazy" />
                </picture>
                <span className={noto_sans.className}>Email</span>
            </Link>
        </button>
);
}
import { noto_sans } from "@/app/utils/text-styling/fonts";
import Link from "next/link";
import Image from "next/image";
import { icons } from "../icons/images-icons";
import { size_space_num } from "../../utils/size-spacing/nums-size-space";

export default function Button_LinkedIn() {
    return(
        <button id="linkedInButton">
            <Link href="https://www.linkedin.com/in/wayne-phung-8a8242102/" rel="external" target="_blank">
                <picture className="icon ratio-1-1">
                    <Image src={icons.linkedIn} width={size_space_num["l-num"]} height={size_space_num["l-num"]} alt="" loading="lazy" />
                </picture>
                LinkedIn
            </Link>
        </button>
    );
}
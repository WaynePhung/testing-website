"use client";
import { literata } from "./../../utils/text-styling/fonts";

interface H2TagProps {
    children: React.ReactNode;
}

export default function H2Tag({ children }: H2TagProps) {
    return (
        <h2 className={literata.className}>
            {children}
        </h2>
    );
}
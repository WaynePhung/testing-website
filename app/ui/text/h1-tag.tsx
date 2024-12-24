"use client";
import { literata } from "./../../utils/text-styling/fonts";

interface H1TagProps {
    children: React.ReactNode;
}

export default function H1Tag({ children }: H1TagProps) {
    return (
        <h1 className={literata.className}>
            {children}
        </h1>
    );
}
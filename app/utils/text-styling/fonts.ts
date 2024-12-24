import { Literata, Noto_Sans } from 'next/font/google';

export const literata = Literata({
    subsets: ['latin'],
    weight : 'variable',
    display: 'swap'
})

export const noto_sans = Noto_Sans({
    subsets: ['latin'],
    weight : 'variable',
    display: 'swap',
    style: 'normal'
})

export const noto_sans_italic = Noto_Sans({
    subsets: ['latin'],
    weight : 'variable',
    display: 'swap',
    style: 'italic'
})
interface hrefs {
    home: string;
    design: string;
    media: string;
    about: string;
};

const 
    slash = "/",
    design = "#design-work",
    media = "#media-work",
    about = "#about-me";

export default function getHrefs(type?: string):
hrefs {
    return {
        home: slash,
        design: (type=="home" ? design : slash + design),
        media: (type=="home" ? media : slash + media),
        about: (type=="home" ? about : slash + about)
    }
}
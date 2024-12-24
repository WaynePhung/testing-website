export default function changeBPText (route: string) {
    console.log('route for buffer text: ' + route);
    switch(route) {
        case ("/"):
            return "viewing home page...";
        case ("/#design-work"):
        case ("#design-work"):
            return "viewing design work...";
        case ("/#media-work"):
        case ("#media-work"):
            return "viewing media work...";
        case ("/#about-me"):
        case ("#about-me"):
            return "about me...";
        case ("/electric-stride"):
        case ("electric-stride"):
            return "viewing the Electric Stride case study...";
        case ("/triton-television-reel"):
        case ("triton-television-reel"):
            return "viewing the TTV Reel case study...";
        default: 
            return "viewing page...";
    }
}
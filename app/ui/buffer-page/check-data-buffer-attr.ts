import changeBPText from "./change-bp-text";

export default function checkDataBufferAttr(e: React.MouseEvent<HTMLAnchorElement>): [Element | null, string | null] {
    const getTarget = e.target;
    console.log('getTarget: ' + e.target);
    if (getTarget instanceof HTMLElement) {
        const getTagName = getTarget.tagName;
        console.log('Tag name: ' + getTagName);
        let getHref: string | null = null;
        let getDataShowBufferAttr: string | null = null;
        if (getTagName === 'IMG' || getTagName === 'SPAN' || getTagName === 'PICTURE') {
            const getParentATag = getTarget.closest('a');
            if (getParentATag) {
                getDataShowBufferAttr = getParentATag.getAttribute('data-showbuffer');
                getHref = getParentATag.getAttribute('href');
                console.log('getHref for ' + getTagName + ' tag: ' + getHref);
            }
        } else if (getTagName === 'A') {
            getHref = getTarget.getAttribute('href');
            getDataShowBufferAttr = getTarget.getAttribute('data-showbuffer');
            console.log('getHref for ' + getTagName + ' tag: ' + getHref);
        } else {
            console.log('The tag returned does not match any of the following: A, IMG, SPAN, or PICTURE');
        }
        console.log('getDataShowBufferAttr: ' + getDataShowBufferAttr);
        if ((getHref != null) && (getDataShowBufferAttr == "true")) {
            // const getBuffer = document.querySelector("aside.buffer-page");
            const getBuffer = document.querySelector("aside.loading-page");
            if (getBuffer instanceof Element) {
                const getH1 = getBuffer.querySelector("h1");
                if (getH1) {
                    changeBPText(getHref);
                    console.log('Changed text: ' + changeBPText(getHref));
                }
                console.log('getBuffer: ' + getBuffer + ' getHref: ' + getHref);
                return [getBuffer, getHref];
            }
        }
    }
    return [null, null];
}
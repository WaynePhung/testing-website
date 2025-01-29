import changeBPText from "./change-bp-text";

export default function bpTransitionEffect(route: string) {
    // const getBuffer = document.querySelector("aside.buffer-page");
    const getBuffer = document.querySelector("aside.loading-page");
    if (getBuffer instanceof Element) {
        const getH1 = getBuffer.querySelector("h1");
        if (getH1) {
            getH1.textContent = changeBPText(route);
            // console.log('Changed text: ' + changeBPText(route));
        }
        getBuffer.classList.add("visible");

        const removeBufferVisibility = () => {
            document.removeEventListener('beforeunload', removeBufferVisibility);
            getBuffer.classList.remove("visible");
        };

        document.addEventListener('beforeunload', removeBufferVisibility);

        const fallbackTimeout = setTimeout(() => {
            document.removeEventListener('beforeunload', removeBufferVisibility);
            getBuffer.classList.remove("visible");
        }, 1500);

        const cleanup = () => {
            document.removeEventListener('beforeunload', removeBufferVisibility);
            clearTimeout(fallbackTimeout);
        };

        return {
            text: changeBPText(route),
            cleanup: cleanup
        };
    }
}

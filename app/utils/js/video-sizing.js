var video = document.querySelectorAll('iframe');

window.addEventListener('load', function() {
    embedVideoHeight();
});
window.addEventListener('resize', function() {
    embedVideoHeight();
});

function embedVideoHeight() {
    for (let i = 0; i < video.length; i++) {
        let getVideoWidth = video[i].offsetWidth, 
            estimateHeight = getVideoWidth*0.5625;
        // if (video[i].parentElement.getElementsByTagName('figcaption').length > -1) {
        //     estimateHeight = (getVideoWidth*0.5625) + video[i].parentElement.getElementsByTagName('figcaption').offsetHeight + 16;
        // } else {
        //     estimateHeight = getVideoWidth*0.5625;
        // }
        console.log("Video's estimated width: " + video[i].offsetWidth);
        // console.log("Video's estimated height: " + getVideoWidth*0.5625);
        console.log("Video's estimated height: " + estimateHeight);
        video[i].style.height = `${estimateHeight}px`;
        video[i].parentElement.style.height = `${estimateHeight}px`;
        console.log("Video height: " + video[i].offsetHeight);
        console.log("Video parent's height: " + video[i].parentElement.offsetHeight);
    }
}
const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const videoViewsNumber = document.getElementById('jsVideoViewsNumber');

const increaseNumber = () => {
    const span = document.createElement('span');
    videoViewsNumber.innerHTML = parseInt(videoViewsNumber.innerHTML, 10) + 1;
    span.innerText = ' 回視聴';
    videoViewsNumber.appendChild(span);
};

const registerView = async () => {
    const videoId = window.location.href.split('/video/')[1];
    const response = await fetch(`/api/${videoId}/view`, {
        method: 'POST'
    });
    if(response.status === 200){
        increaseNumber();
    }
};

const handleEnded = () => {
    registerView();
};

const init = () => {
    videoPlayer.addEventListener('ended', handleEnded);
};

if(videoContainer){
    init();
}
const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;
let recordedChunks = [];

const makeLink = () => {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const btn = document.createElement('button');
    link.href = url
    link.id = 'download';
    link.download = '収録済み.webm';
    btn.textContent = 'ダウンロード';
    link.appendChild(btn);
    recorderContainer.appendChild(link);
};

const handleVideoData = event => {
    if(event.data.size > 0){
        recordedChunks.push(event.data);
    }
};

const stopRecording = () => {
    videoRecorder.stop();
    videoPreview.pause();
    recordBtn.removeEventListener('click', stopRecording);
    recordBtn.addEventListener('click', delVideoConfirm);
    recordBtn.innerHTML = '動画を撮る';
    recordBtn.classList.remove('recording');
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.addEventListener('stop', makeLink);
    videoRecorder.addEventListener('dataavailable', handleVideoData);
    recordBtn.addEventListener('click', stopRecording);
    videoRecorder.start();
};

const delVideoConfirm = () => {
    if(document.getElementById('download')){
        const result = confirm(`
        既存に作成された動画は削除されます。
        新しい動画を作りますか？
        `);
        if(result){
            const oldVideo = document.getElementById('download');
            recorderContainer.removeChild(oldVideo);
            recordBtn.removeEventListener('click', delVideoConfirm);
            recordedChunks = [];
            getVideo();
        }
    }else{
        recordBtn.removeEventListener('click', delVideoConfirm);
        getVideo();
    }
};

const getVideo = async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = '中止';
        recordBtn.classList.add('recording');
        streamObject = stream;
        startRecording();
    }catch(error){
        console.error(error);
        recordBtn.innerHTML = '動画が撮れません';
    }
};

const init = () => {
    recordBtn.addEventListener('click', delVideoConfirm);
};

if(recorderContainer){
    init();
}
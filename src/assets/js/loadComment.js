import axios from 'axios';

const commentList = document.getElementById('jsCommentList');
const loadComment = document.getElementById('jsLoadComment');
const commentNumber = document.getElementById('jsCommentNumber');

const sendRequest = async () => {
    let cntComment = parseInt(commentList.childElementCount, 10);
    const videoId = window.location.href.split('/video/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment/load/${cntComment}`,
        method: 'GET'
    });
    if(response.status === 200){
        const { data } = response;
        console.log(data);
        data.forEach(e => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.innerHTML = e.text;
            li.appendChild(span);
            commentList.appendChild(li);
        });
        
        loadComment.dataset.value = parseInt(loadComment.dataset.value, 10) + 10;
        if(parseInt(loadComment.dataset.value, 10)  > parseInt(commentNumber.textContent, 10) ){
            loadComment.dataset.value = commentNumber.textContent;
            const btn = loadComment.firstChild;
            btn.textContent = 'コメントがもうありません';
        }
    }
};

if(loadComment){
    loadComment.addEventListener('click', sendRequest);
}
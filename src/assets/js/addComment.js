import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const loadComment = document.getElementById('jsLoadComment');
const commentList = document.getElementById('jsCommentList');
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
            const div = document.createElement('div');
            div.classList.add('video__comments-list__details');
            const a = document.createElement('a');
            a.href = `/user/${e.creator._id}`;
            const span1 = document.createElement('span');
            span1.innerHTML = e.creator.name;
            a.appendChild(span1);
            const span2 = document.createElement('span');
            span2.innerHTML = e.text;
            div.appendChild(a);
            div.appendChild(span2);
            li.appendChild(div);
            commentList.appendChild(li);
        });
        
        loadComment.dataset.value = parseInt(loadComment.dataset.value, 10) + 10;
        if(parseInt(loadComment.dataset.value, 10)  > parseInt(commentNumber.textContent, 10) ){
            const btn = loadComment.firstChild;
            btn.classList.add('noComment');
            btn.textContent = 'コメントがもうありません';
            loadComment.removeEventListener('click', sendRequest);
        }
    }
};

const conuntComment = () => {
    const cntComment = parseInt(commentList.childElementCount, 10);
    if(cntComment > loadComment.dataset.value){
        loadComment.addEventListener('click', sendRequest);
        btn.classList.remove('noComment');
        btn.textContent = 'コメントをもっと見る';
        commentList.lastChild.remove();
    }
};

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
    conuntComment();
};

const addComment = (comment, _id, name) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add('video__comments-list__details');
    const a = document.createElement('a');
    a.href = `/user/${_id}`;
    const span1 = document.createElement('span');
    span1.innerHTML = name;
    a.appendChild(span1);
    const span2 = document.createElement('span');
    span2.innerHTML = comment;
    div.appendChild(a);
    div.appendChild(span2);
    li.appendChild(div);
    commentList.prepend(li);
    increaseNumber();
};

const sendComment = async comment => {
    const videoId = window.location.href.split('/video/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment
        }
    });
    if(response.status === 200){
        const { data: { _id, name } } = response;
        addComment(comment, _id, name);
    }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = '';
};

const init = () => {
    addCommentForm.addEventListener('submit', handleSubmit);
    if(parseInt(commentNumber.innerHTML, 10) > 10){
        loadComment.addEventListener('click', sendRequest);
        const btn = loadComment.firstChild;
        btn.classList.remove('noComment');
        btn.textContent = 'コメントをもっと見る';
    }
};

if(addCommentForm){
    init();
}
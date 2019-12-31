// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// User
const USER = '/user';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSSWORD = '/change-password';
const ME = '/me';

// Video
const VIDEO = '/video';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// LINE
const LINE = '/auth/line';
const LINE_CALLBACK = '/auth/line/callback';

// API
const API = '/api';
const REGISTER_VIEW = '/:id/view';
const ADD_COMMENT = '/:id/comment';

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    user: USER,
    userDetail: (id) => {
        if(id){
            return `/user/${id}`;
        }else{
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSSWORD,
    me: ME,
    video: VIDEO,
    upload:UPLOAD,
    videoDetail: (id) => {
        if(id){
            return `/video/${id}`;
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if(id){
            return `/video/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if(id){
            return `/video/${id}/delete`;
        }else{
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    line: LINE,
    lineCallback: LINE_CALLBACK,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;

import routes from './routes';
import multer from 'multer';

const multerVideo  = multer({dest: 'uploads/videos/'});
const multerAvatar = multer({dest: 'uploads/avatars/'});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'AwesomeTube';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    }else{
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.redirect(routes.home);
    }
};

// single 하나의 이미지를 업로드 할 때 사용 => req.file 객체 생성
// array 여러개의 이미지를 업로드 할 때 사용, 속성 하나에 이미지를 여러개 업로드
// fields 여러개의 이미지를 업로드 할 때 사용, 여러 개의 속성에 이미지를 하나씩 업로드
// none 이미지를 올리지 않고 데이만 multipart 형식으로 전송할 때 사용
export const uploadVideo  = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');
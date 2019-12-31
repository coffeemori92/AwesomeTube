import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({'_id': -1});
        res.render('home',{
           pageTitle: 'ようこそ！',
           videos: videos 
        });
    }catch(error){
        console.error(error);
        res.render('home', {
            pageTitle: 'ようこそ！',
            videos: []
        });
    }
};

export const search = async (req, res) => {
    console.log(req.query);
    const { query: { term: searchingBy } } = req;
    let videos = [];
    try{
        videos = await Video.find({
            title: {
            $regex: searchingBy, 
            $options: 'i'
        }});
    }catch(error){
        console.error(error);
    }
    res.render('search', {
        pageTitle: '検索',
        searchingBy,
        videos
    });
};

export const getUpload = (req, res) => {
    res.render('upload', {
        pageTitle: 'アップロード'
    });
};

export const postUpload = async (req, res) => {
    const {
        body: {
            title, description
        },
        file: {
            path
        }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id).populate('creator').populate('comments');
        res.render('videoDetail', { pageTitle: video.title, video });
    }catch(error){
        console.error(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try{
        const video = await Video.findById(id);
        if(String(video.creator) !== req.user.id){
            throw Error();
        }else{
            res.render('editVideo', {
                pageTitle: '動画の編集', video
            });
        }
    }catch(error){
        console.error(error);
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try{
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    }catch(error){
        console.error(error);
        res.redirect(routes.home);
    }
};
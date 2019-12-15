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
    const {query: {term: searchingBy}} = req;
    let videos = [];
    try{
        videos = await Video.find({title: {
            $regex: searchingBy, 
            $opions: 'i'
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
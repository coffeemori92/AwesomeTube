import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({'_id': -1});
        res.render('home',{
           pageTitle: 'Home',
           videos: videos 
        });
    }catch(error){
        console.error(error);
        res.render('home', {
            pageTitle: 'Home',
            videos: []
        });
    }
};
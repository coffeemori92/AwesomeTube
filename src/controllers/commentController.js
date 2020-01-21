import Video from '../models/Video';
import Comment from '../models/Comment';

export const getLoadComment = async (req, res) => {
    const {
        params: { id, commentCount }
    } = req;
    console.log('commentCount', commentCount);
    try{
        const comments = await Comment.find({ video: id })
                                      .sort({'createdAt': -1})
                                      .skip(parseInt(commentCount, 10))
                                      .limit(10).populate('creator');
        res.json(comments);
    }catch(error){
        console.error(error);
        res.status(400);
    }
};

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            video: video.id,
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();
    }catch(error){
        console.error(error);
        res.status(400);
    }finally{
        res.end();
    }
};
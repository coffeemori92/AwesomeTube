import Video from '../models/Video';
import Comment from '../models/Comment';

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
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
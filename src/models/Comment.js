import mongooose from 'mongoose';

const CommentSchema = new mongooose.Schema({
    text: {
        type: String,
        required: true
    },
    video: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    creator: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongooose.model('Comment', CommentSchema);

export default model;
import mongooose from 'mongoose';

const CommentSchema = new mongooose.Schema({
    text: {
        type: String,
        required: true
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
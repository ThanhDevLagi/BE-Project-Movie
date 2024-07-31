const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;

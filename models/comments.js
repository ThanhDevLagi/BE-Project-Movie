const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    idMovie: { type: String, required: true }, // Loại bỏ ref cho String
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

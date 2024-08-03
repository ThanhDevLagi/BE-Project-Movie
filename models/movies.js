const mongoose = require('mongoose');
const { Group } = require('./group'); // Đảm bảo đường dẫn là chính xác
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    original_name: { type: String, required: true },
    thumb_url: { type: String },
    poster_url: { type: String },
    time: { type: String },
    quality: { type: String },
    language: { type: String },
    description: { type: String },
    categories: { type: Map, of: new Schema({
        group: {
            id: String,
            name: String
        },
        list: [
            {
                id: String,
                name: String
            }
        ]
    }) }
});

const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = {
    Movies,
};

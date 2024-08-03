const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa mô hình Movie
const movieSchema = new Schema({
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
    }) },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Movie', movieSchema);

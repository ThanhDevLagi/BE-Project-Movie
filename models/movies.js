const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    id: {type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    slug: String,
    original_name: String,
    thumb_url: String,
    poster_url: String,
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    description: String,
    total_episodes: Number,
    current_episode: String,
    time: String,
    quality: String,
    language: String,
    director: String,
    casts: String,
    category: {
        type: Map,
        of: new Schema({
            group: {
                id: String,
                name: String
            },
            list: [{
                id: String,
                name: String
            }]
        })
    }
});

const Movies = mongoose.model('Movies', MoviesSchema);
module.exports = Movies;

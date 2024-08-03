const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoriteMovies: [
        {
            id: { type: String, required: true },
            name: String,
            slug: String,
            original_name: String,
            thumb_url: String,
            poster_url: String,
            description: String,
            total_episodes: Number,
            current_episode: String,
            time: String,
            quality: String,
            language: String,
            director: String,
            casts: String,
            category: { type: Object },
            episodes: [],
            createdAt: { type: Date, default: Date.now },

        }
    ]
});

const Favorites = mongoose.model('Favorites', favoriteSchema);
module.exports = Favorites;

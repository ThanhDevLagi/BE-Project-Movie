const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

const GroupSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    list: [CategorySchema]
});

const MoviesSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
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
    category: { type: Map, of: GroupSchema }
});

const Movies = mongoose.model('Movies', MoviesSchema);
const Category = mongoose.model('Category', CategorySchema);
const Group = mongoose.model('Group', GroupSchema);
module.exports = {
    Movies,
    Category,
    Group
};

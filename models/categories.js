const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categoriesSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

const GroupSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    list: [CategorySchema],
    createdAt: { type: Date, default: Date.now },

});

const Category = mongoose.model('Category', CategorySchema);
const Group = mongoose.model('Group', GroupSchema);

module.exports = {
    Category,
    Group
};

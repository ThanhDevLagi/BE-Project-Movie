const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String,
        required: true,
        maxlength: 55,
        default: 'No name'
    },
    email: {
        type: String,
        required: true,
        unique: true, // Giữ unique cho email
        trim: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        default: 'No email'
    },
    img: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


module.exports = mongoose.models.User || mongoose.model('User', userSchema);

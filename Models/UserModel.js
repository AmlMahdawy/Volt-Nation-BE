// const validator = require('validator');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: {
        type: String,
        required: true,
    },
    password: { type: String, minLength: 5, required: true },
    phone: { type: String },
    favourite: [],
    recentlyViewed: [],
    purchased: [],
    addresses: [],
    isAdmin: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    }


})
module.exports = mongoose.model("Users", UsersSchema);
// const validator = require('validator');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: {
        type: String,
        required: true,
    },
    password: { type: String, minLength: 5, default: "" },
    phone: { type: String, default: "" },
    favourite: [],
    recentlyViewed: [],
    purchased: [],
    addresses: [],
    role: {
        type: String,
        enum: ['admin', 'user', 'master'],
        required: true,
        default: "user"
    }


})
module.exports = mongoose.model("Users", UsersSchema);
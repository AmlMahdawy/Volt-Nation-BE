// const validator = require('validator');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: {
        type: String,
        required: true,
    },
    password: { type: String, minLength: 5, required: true },
    purchased: [],
    favourite: [],
    isAdmin: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    },
    image: {}

})
module.exports = mongoose.model("Users", UsersSchema);
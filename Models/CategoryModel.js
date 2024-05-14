const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    date: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    productsNum: {
        type: Number,
        default: 0
    },
    imgs: []

});

module.exports = mongoose.model("Category", CategorySchema);

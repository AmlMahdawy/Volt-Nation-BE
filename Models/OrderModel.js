const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    products: [],
    status: {
        type: String,
        default: "processing"
    },
    address: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: ""
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    userID: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Orders", OrdersSchema);

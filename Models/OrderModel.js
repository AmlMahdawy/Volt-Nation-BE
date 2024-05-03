
const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({

    products: [],
    status: {
        type: String,
        default: "processing"
    },
    address: {
        type: String
    },
    date: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    userId: String


})
module.exports = mongoose.model("Orders", OrdersSchema);
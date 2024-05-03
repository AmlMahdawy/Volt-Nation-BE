const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userID: String,
    products: [],
    totalPrice: Number


})
module.exports = mongoose.model("Carts", CartSchema);
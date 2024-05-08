const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userID: String,
    products: [{

        product: {
            type: {},
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: Number


})
module.exports = mongoose.model("Carts", CartSchema);
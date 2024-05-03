const UserModel = require("../Models/UserModel")
const ProductModel = require("../Models/ProductModel");
const CartModel = require("../Models/CartModel")
const UserController = require("../Controllers/UserController");



const GetCart = async (req, res) => {
    let userId = await UserController.DecodeToken(req)
    if (userId) {
        let cart = await CartModel.findOne({ userID: userId })
        res.send(cart)
    }

}
const AddToCart = async (req, res) => {
    let { productId } = req.params;
    let userId = await UserController.DecodeToken(req)
    let cart = await CartModel.findOne({ userID: userId })
    let product = await ProductModel.findOne({ _id: productId })

    let foundProduct = cart.products.find((obj) => {
        return obj.product._id == productId
    })
    if (foundProduct) {

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].product._id == productId) {
                cart.products[i].quantity = cart.products[i].quantity + 1;
                cart.totalPrice = cart.totalPrice + (+product.price)
                cart.markModified('products');
            }
        }
        await cart.save();

        res.send(cart);

    } else {
        cart.products.push({ product, quantity: 1 })
        cart.totalPrice = (cart.totalPrice + (+product.price))
        await cart.save()


        res.send(cart)

    }



}
const Decrement = async (req, res) => {
    let { productId } = req.params
    let userId = await UserController.DecodeToken(req)
    let cart = await CartModel.findOne({ userID: userId })

    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].product._id == productId) {
            cart.products[i].quantity = cart.products[i].quantity - 1;
            cart.totalPrice = cart.totalPrice - (+cart.products[i].product.price)
            if (cart.products[i].quantity == 0) {
                cart.products.splice(i, 1)
            }
            cart.markModified('products');
        }
    }
    await cart.save();
    return res.send(cart);
}
const RemoveItemFromCart = async (req, res, next) => {

    let { productId } = req.params
    let userId = await UserController.DecodeToken(req)
    let cart = await CartModel.findOne({ userID: userId })


    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].product._id == productId) {
            cart.totalPrice = cart.totalPrice - ((+cart.products[i].product.price) * (cart.products[i].quantity))

            cart.products.splice(i, 1)

            cart.markModified('products');
        }
    }
    await cart.save();
    return res.send(cart);
}
const CheckOut = async (req, res) => {

    let userId = await UserController.DecodeToken(req)
    let user = await UserController.GetUserById(userId)
    let cart = await CartModel.findOne({ userID: userId })


    for (let i = 0; i < cart.products.length; i++) {
        //add to purchased 

        let foundPurchase = user.purchased.find((obj) => {
            return obj.product._id == cart.products[i].product._id
        })
        if (!foundPurchase) {
            cart.products[i].review = false
            user.purchased.push(cart.products[i])
        }
        //decrement available book quantity
        let productId = cart.products[i].product._id
        let product = await ProductModel.findOne({ _id: productId })
        product.quantity = product.quantity - cart.products[i].quantity
        product.markModified('quantity')
        await product.save()
        await user.save()

    }
    let updatedCart = await CartModel.findOneAndUpdate({ userID: userId }, { $set: { totalPrice: 0, products: [] } }, { new: true })
    await cart.save();
    res.send(updatedCart)
}
module.exports = {
    GetCart,
    AddToCart,
    Decrement,
    RemoveItemFromCart,
    CheckOut
}
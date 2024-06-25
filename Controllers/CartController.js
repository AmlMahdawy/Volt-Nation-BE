const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel");
const CartModel = require("../Models/CartModel")
const UserController = require("../Controllers/UserController");



const GetCart = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res)
    if (userId) {
        let cart = await CartModel.findOne({ userID: userId })
        res.send(cart)
    }

}
const AddToCart = async (req, res) => {
    let { productId } = req.params;
    try {

        let userId = await UserController.DecodeToken(req, res)
        if (userId) {
            let cart = await CartModel.findOne({ userID: userId })
            let product = await ProductModel.findOne({ _id: productId })
            if (product) {
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
                }
                else {
                    cart.products.push({ product, quantity: 1 })
                    cart.totalPrice = (cart.totalPrice + (+product.price))
                    await cart.save()
                    res.send(cart)
                }
            } else {
                console.log('Product not found')
            }
        }
    } catch (e) {
        console.log("error", e)
    }
}


const Decrement = async (req, res) => {
    let { productId } = req.params
    let userId = await UserController.DecodeToken(req, res)
    if (userId) {
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
}
const RemoveItemFromCart = async (req, res, next) => {

    let { productId } = req.params
    let userId = await UserController.DecodeToken(req, res)
    if (userId) {
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
}

const CheckOut = async (req, res) => {

    let addressId = req.body.addressId
    let userId = await UserController.DecodeToken(req, res)
    if (userId) {

        let user = await UserController.GetUserById(userId)
        let cart = await CartModel.findOne({ userID: userId })
        let { products, totalPrice, userID } = cart

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth());
        let order = new OrderModel({ products, totalPrice, userID, date: currentDate.toUTCString(), address: addressId });
        await order.save()
        for (let i = 0; i < cart.products.length; i++) {
            //add to purchased 
            let productId = cart.products[i].product._id
            let foundPurchase = user.purchased.find((obj) => {
                return obj.product.name == cart.products[i].product.name
            })
            if (!foundPurchase) {
                cart.products[i].review = false
                user.purchased.push(cart.products[i])
            }

            let product = await ProductModel.findOne({ _id: productId })
            product.quantity = product.quantity - cart.products[i].quantity
            product.salesNum = product.salesNum + cart.products[i].quantity
            product.markModified('quantity')
            product.markModified('salesNum')

            await product.save()
            await user.save()

        }
        let updatedCart = await CartModel.findOneAndUpdate({ userID: userId }, { $set: { totalPrice: 0, products: [] } }, { new: true })
        await cart.save();
        res.send(updatedCart)
    }

}
module.exports = {
    GetCart,
    AddToCart,
    Decrement,
    RemoveItemFromCart,
    CheckOut
}

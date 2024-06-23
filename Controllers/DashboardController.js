const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserModel = require("../Models/UserModel")


const GetStatistics = async (req, res) => {
    let totalSales = await OrderModel.find({ totalPrice: { $gt: 0 } }, { totalPrice: 1, _id: 0 })
    let productsNum = await ProductModel.find({})
    let users = await UserModel.find({}, { _id: 1 })
    let orders = await OrderModel.find({}, { date: 1, totalPrice: 1 })

    let sales = 0;
    totalSales.forEach((obj) => {
        sales = sales + obj.totalPrice
    })
    res.send({ "sales": sales, "users": users.length, "orders": orders.length, "products": productsNum.length, "recentOrder": orders.slice(0, 20) })
}
module.exports = {
    GetStatistics,

}
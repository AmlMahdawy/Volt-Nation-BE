const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserModel = require("../Models/UserModel")
const GetStatistics = async (req, res) => {
    let totalSales = await OrderModel.find({ totalPrice: { $gt: 0 } }, { totalPrice: 1, _id: 0 })
    let users = await UserModel.find({}, { _id: 1 })
    let orders = await OrderModel.find({}, { _id: 1 })
    let sales = 0;
    totalSales.forEach((obj) => {
        sales = sales + obj.totalPrice
    })
    res.send({ "sales": sales, "users": users.length, "orders": orders.length })
}

const GetOrders = async (req, res) => {
    let orders = await OrderModel.find({}, {
        totalPrice: 1, userID: 1, status: 1, date: 1
    })
    let modified = orders
    for (let i = 0; i < modified.length; i++) {
        let user = await UserModel.findOne({ _id: modified[i].userID })
        modified[i].userName = user.name
    }
    res.send(modified)

}


module.exports = {
    GetStatistics,
    GetOrders
}
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


//////////////
// ORDERS
/////////////
const GetOrders = async (req, res) => {
    let orders = await OrderModel.find({}, {
        totalPrice: 1, userID: 1, status: 1, date: 1
    })
    let modified = []
    // console.log(modified)

    for (let i = 0; i < orders.length; i++) {
        let user = await UserModel.findOne({ _id: orders[i].userID }, { name: 1, _id: 0 })
        orders[i] = { ...orders[i], userName: user.name }
        modified.push(orders[i])
    }
    res.send(modified)

}
const DeleteOrder = async (req, res) => {
    let { orderId } = req.params
    let deleted = await OrderModel.findOneAndDelete({ _id: orderId })
    if (deleted) {
        res.status(200).send({ message: "order deleted" })
    } else {
        res.status(404).send({ message: "order not found" })

    }
}

module.exports = {
    GetStatistics,
    GetOrders,
    DeleteOrder
}
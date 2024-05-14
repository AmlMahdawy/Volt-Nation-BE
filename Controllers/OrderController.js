const OrderModel = require("../Models/OrderModel")
const UserController = require("../Controllers/UserController")


const GetOrders = async (req, res) => {
    let orders = await OrderModel.find({}, {
        totalPrice: 1, userID: 1, status: 1, date: 1
    })
    res.send(orders)
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

const UpdateOrderStatus = async (req, res) => {
    let { orderId, status } = req.params
    let order = await OrderModel.findOneAndUpdate({ _id: req.orderId }, { status: status })
    if (order) {
        res.status(200).send({ res: "status updated" })

    } else {
        res.status(404).send({ res: "order not found" })
    }

}

const GetOrderByUserId = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let orders = await OrderModel.find({ userID: userId })
        res.send(orders)
    }

}

module.exports = {
    GetOrders,
    DeleteOrder,
    UpdateOrderStatus,
    GetOrderByUserId
}
const CartModel = require("../Models/CartModel")
const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserModel = require("../Models/UserModel")


const GetStatistics = async (req, res) => {
    let totalSales = await OrderModel.find({ totalPrice: { $gt: 0 } }, { totalPrice: 1, _id: 0 })
    let productsNum = await ProductModel.find({})
    let users = await UserModel.find({}, { _id: 1 })
    let orders = await OrderModel.find({}, { date: 1, totalPrice: 1 })


    const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" }
                },
                totalMonthlyPrice: { $sum: "$totalPrice" }
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                month: { $arrayElemAt: [monthMap, { $subtract: ["$_id.month", 1] }] },
                totalMonthlyPrice: 1
            }
        },
        {
            $sort: { year: -1, "_id.month": -1 }
        }
    ]);

    let sales = 0;
    totalSales.forEach((obj) => {
        sales = sales + obj.totalPrice
    })
    res.send({ "sales": sales, "users": users.length, "orders": orders.length, "products": productsNum.length, "recentOrder": orders.slice(0, 20), result })
}

const alterRole = async (req, res) => {
    try {
        let { id } = req.params
        let user = await UserModel.findOne({ _id: id }, { role: 1 })
        if (user.role == "admin") {
            console.log("lol")
            user.role = "user"
        } else {
            user.role = "admin"

        }
        console.log(user.role)
        user.markModified("role")
        await user.save()
        res.status(200).send()
    } catch (err) {
        res.send({ "err": err.message })
    }

}

const removeUser = async (req, res) => {
    try {
        let { id } = req.params
        await UserModel.findOneAndDelete({ _id: id })
        await CartModel.findOneAndDelete({ userID: id })
        await OrderModel.findOneAndDelete({ userID: id })

        res.status(200).send()
    } catch (err) {
        res.send({ "err": err.message })
    }

}
const getAllUsers = async (req, res) => {

    let users = await UserModel.find({}, { name: 1 })

    res.send(users)
}
module.exports = {
    GetStatistics,
    alterRole,
    removeUser,
    getAllUsers
}
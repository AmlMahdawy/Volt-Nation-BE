const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserModel = require("../Models/UserModel")


const GetStatistics = async (req, res) => {
    let totalSales = await OrderModel.find({ totalPrice: { $gt: 0 } }, { totalPrice: 1, _id: 0 })
    let productsNum = await ProductModel.find({})
    let users = await UserModel.find({}, { _id: 1 })
    let orders = await OrderModel.find({}, { date: 1, totalPrice: 1 })

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
                month: {
                    $concat: [
                        { $toString: "$_id.year" },
                        "-",
                        { $cond: { if: { $lt: ["$_id.month", 10] }, then: { $concat: ["0", { $toString: "$_id.month" }] }, else: { $toString: "$_id.month" } } }
                    ]
                },
                totalMonthlyPrice: 1
            }
        },
        {
            $sort: { month: 1 } // Sort by month in ascending order
        }
    ]);



    let sales = 0;
    totalSales.forEach((obj) => {
        sales = sales + obj.totalPrice
    })
    res.send({ "sales": sales, "users": users.length, "orders": orders.length, "products": productsNum.length, "recentOrder": orders.slice(0, 20), result })
}

module.exports = {
    GetStatistics,

}
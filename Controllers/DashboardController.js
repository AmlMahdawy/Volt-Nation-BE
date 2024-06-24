const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserModel = require("../Models/UserModel")


const GetStatistics = async (req, res) => {
    let totalSales = await OrderModel.find({ totalPrice: { $gt: 0 } }, { totalPrice: 1, _id: 0 })
    let productsNum = await ProductModel.find({})
    let users = await UserModel.find({}, { _id: 1 })
    let orders = await OrderModel.find({}, { date: 1, totalPrice: 1 })


    const monthMap = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    };

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
                month: { $arrayElemAt: [Object.values(monthMap), { $subtract: ["$_id.month", 1] }] },
                totalMonthlyPrice: 1
            }
        },
        {
            $sort: { year: 1, month: 1 } // Sort by year and month in ascending order
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
const OrderModel = require("../Models/OrderModel")
const UserModel = require("../Models/UserModel")

const UserController = require("../Controllers/UserController")


const GetOrders = async (req, res) => {
    try {

        let orders = await OrderModel.find({}, {
            totalPrice: 1, userID: 1, status: 1, date: 1
        });

        // Step 2: Extract User IDs
        let userIds = orders.map(order => order.userID);
        userIds = [...new Set(userIds)]; // Remove duplicates

        // Step 3: Fetch User Names
        let users = await UserModel.find({ _id: { $in: userIds } }, { name: 1 });
        let userMap = {};
        users.forEach(user => {
            userMap[user._id] = user.name;
        });

        // Step 4: Map User Names to Orders
        let enrichedOrders = orders.map(order => {
            return {
                ...order._doc,
                userName: userMap[order.userID]
            };
        });

        // Step 5: Send Response
        res.send(enrichedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
};



const UpdateOrderStatus = async (req, res) => {
    let { orderId, status } = req.params
    let order = await OrderModel.findOneAndUpdate({ _id: orderId }, { status: status })
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

    UpdateOrderStatus,
    GetOrderByUserId
}
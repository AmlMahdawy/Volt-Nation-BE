const UserModel = require("../Models/UserModel")
const OrderModel = require("../Models/OrderModel")
const ProductModel = require("../Models/ProductModel")
const UserController = require("../Controllers/UserController")

const { v4: uuidv4 } = require('uuid');

//profile functions

//basic info
let GetUserData = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res)
    if (userId) {
        let user = await UserController.GetUserById(userId);
        res.status(200).send(user);
    }

}

let UpdateUserData = async (req, res) => {
    let data = req.body.data;
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        await UserModel.findByIdAndUpdate(userId, { name: data.name, email: data.email, phone: data.phone });
        res.status(200).send({ res: true });
    }


}


//address book
const resetDefaultFalse = async (user) => {
    let addreses = user.addresses.map((address) => {
        address.isDefault = false;
        return address
    })
    await UserModel.findOneAndUpdate({ _id: user._id }, { $set: { addresses: addreses } });
    await user.save()
}
const CreateAddress = async (req, res) => {

    let data = req.body.data;
    let isDefault = data.isDefault;
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserModel.findById(userId);
        const _id = uuidv4();
        data.id = _id;
        if (isDefault) {
            resetDefaultFalse(user)
        }
        await UserModel.findByIdAndUpdate(userId, { $push: { addresses: data } });
        res.status(200).send({ success: true });
    }


}

const EditAddress = async (req, res) => {

    let data = req.body.data;
    let isDefault = data.isDefault;
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserModel.findById(userId);
        let addressId = data.id;

        if (isDefault) {
            await resetDefaultFalse(user)
            for (let i = 0; i < user.addresses.length; i++) {
                if (user.addresses[i].id == addressId) {
                    user.addresses[i] = data
                    await user.save()
                }
            }
        } else {
            for (let i = 0; i < user.addresses.length; i++) {
                if (user.addresses[i].id == addressId) {
                    user.addresses[i] = data
                    await user.save()
                }
            }
        };
        res.status(200).send({ success: true });
    }


}
const GetAllAdrresses = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserController.GetUserById(userId);
        res.send(user.addresses);
    }

}

const DeleteAddress = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserModel.findById(userId);
        let addressId = req.params.id;

        for (let i = 0; i < user.addresses.length; i++) {
            if (user.addresses[i].id == addressId) {
                user.addresses.splice(i, 1)
                await user.save()
            }
        }

        res.status(200).send({ success: true });
    }


}



//WISHLIST
const AddToWishlist = async (req, res) => {
    let product = await ProductModel.findOne({ _id: req.params.productId })
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserController.GetUserById(userId);
        user.favourite.push(product)
        await user.save()
        res.send(user.favourite)
    }

}
const RemoveFromWishlist = async (req, res) => {
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserController.GetUserById(userId);
        user.favourite.find((product, index) => {
            if (product._id == req.params.productId) {
                user.favourite.splice(index, 1)
            }
        })
        await user.save()
        res.send(user.favourite)
    }
}
//RecentlyViewed
const AddToviewed = async (req, res) => {
    let product = await ProductModel.findOne({ _id: req.params.productId })
    let userId = await UserController.DecodeToken(req, res);
    if (userId) {
        let user = await UserController.GetUserById(userId);
        if (user.recentlyViewed.length == 5) {
            user.recentlyViewed.shift()
            user.recentlyViewed.push(product)

        } else {
            user.recentlyViewed.push(product)

        }

        await user.save()
        res.send(user.recentlyViewed)
    }

}
module.exports = {
    GetUserData,
    UpdateUserData,
    CreateAddress,
    GetAllAdrresses,
    EditAddress,
    DeleteAddress,
    AddToWishlist,
    RemoveFromWishlist,
    AddToviewed
}
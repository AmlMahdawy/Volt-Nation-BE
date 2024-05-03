const UserModel = require("../Models/UserModel")
const UserController = require("../Controllers/UserController");
const { v4: uuidv4 } = require('uuid');

//profile functions

//basic info
let GetUserData = async (req, res) => {
    let userId = await UserController.DecodeToken(req)
    let user = await UserController.GetUserById(userId);
    res.status(200).send(user);
}

let UpdateUserData = async (req, res) => {
    let data = req.body.data;
    let userId = await UserController.DecodeToken(req);
    await UserModel.findByIdAndUpdate(userId, { name: data.name, email: data.email, phone: data.phone });
    res.status(200).send({ res: true });

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
    try {
        let data = req.body.data;
        let isDefault = data.isDefault;
        let userId = await UserController.DecodeToken(req);
        let user = await UserModel.findById(userId);
        const _id = uuidv4();
        data.id = _id;
        if (isDefault) {
            resetDefaultFalse(user)
        }
        await UserModel.findByIdAndUpdate(userId, { $push: { addresses: data } });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error creating address:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const EditAddress = async (req, res) => {

    let data = req.body.data;
    let isDefault = data.isDefault;
    let userId = await UserController.DecodeToken(req);
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
const GetAllAdrresses = async (req, res) => {
    let userId = await UserController.DecodeToken(req);
    let user = await UserController.GetUserById(userId);
    res.send(user.addresses);
}

const DeleteAddress = async (req, res) => {
    let userId = await UserController.DecodeToken(req);
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


module.exports = {
    GetUserData,
    UpdateUserData,
    CreateAddress,
    GetAllAdrresses,
    EditAddress,
    DeleteAddress
}
const UserModel = require("../Models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//helper functions 
async function duplicateUserCheck(email) {
    return await UserModel.findOne({ email: email }).exec();
}
let DecodeToken = async (req, res) => {

    let token = req.header("Authorization")
    if (token) {
        let userID = jwt.verify(token, "volt").id
        return userID
    }
    return false;
}
let GetUserById = async (_id) => {
    return await UserModel.findOne({ id: _id })
};

////////////////////////

let Register = async (req, res, next) => {

    var Data = req.body;
    let foundUser = await duplicateUserCheck(Data.email);
    if (foundUser) return res.status(401).send({ message: "email already registered" });

    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(Data.password, salt);

    Data.email = Data.email.toLowerCase();
    Data.password = hashedPassword;
    Data.isAdmin = 'user'

    var newUser = new UserModel(Data);
    await newUser.save()
        .then()
        .catch((err) => { res.json({ message: err }) });
    res.status(201).send({ message: true });
};


let Login = async (req, res) => {
    var body = req.body;
    if (!body.gmail) {
        body.email = body.email.toLowerCase();
        let foundUser = await duplicateUserCheck(body.email);
        if (!foundUser) return res.status(403).send({ message: "Invalid E-mail" })
        var passwordValid = await bcrypt.compare(body.password, foundUser.password);
        if (!passwordValid) return res.status(403).send({ message: "Invalid Password" });
        var token = jwt.sign({ id: foundUser._id, isAdmin: foundUser.isAdmin }, "volt", { expiresIn: "24h" });
        res.header("x-auth-token", token);
        res.status(200).send({ token: token });
    } else {
        body.email = body.email.toLowerCase();
        let foundUser = await duplicateUserCheck(body.email);
        if (!foundUser) return res.status(403).send({ message: "Invalid E-mail" })
        var token = jwt.sign({
            id: foundUser._id,
            isAdmin: foundUser.isAdmin
        }, "volt", { expiresIn: "24h" });
        res.header("x-auth-token", token);
        res.status(200).send({ token: token });
    }


}



module.exports = {
    Register,
    Login,
    GetUserById,
    DecodeToken
};











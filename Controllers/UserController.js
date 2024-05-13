const UserModel = require("../Models/UserModel")
const CartModel = require("../Models/CartModel")

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")





//nodemailer transporter configerations 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "voltnation44@gmail.com",
        pass: "azqo zhvi tgjc luqe"
    }
})

//helper functions 
async function duplicateUserCheck(email) {
    return await UserModel.findOne({ email: email }).exec();
}
let DecodeToken = async (req, res) => {
    try {
        let token = req.header("Authorization")
        if (token) {
            let userID = jwt.verify(token, "volt").id
            return userID
        }
        return false;
    }
    catch (error) {
        res.send({ "Error while verifying token:": error });
    }
}
let GetUserById = async (id) => {
    return await UserModel.findOne({ _id: id })
};

////////////////////////

let Register = async (req, res, next) => {
    let user = {}
    var Data = req.body;
    let foundUser = await duplicateUserCheck(Data.email);
    if (foundUser) return res.status(401).send({ res: false, message: "email already registered" });



    Data.email = Data.email.toLowerCase();
    Data.name = Data.firstName + " " + Data.lastName;

    if (!Data.gmail) {
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(Data.password, salt);
        Data.password = hashedPassword;
    } else {
        const randomNumber = Number.toString(Math.floor(Math.random() * 90000000) + 10000000);
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(randomNumber, salt);
        Data.password = hashedPassword;
    }
    var newUser = new UserModel(Data);
    let userCart = new CartModel({ userID: newUser._id, totalPrice: 0 })
    await userCart.save()
    await newUser.save()
    res.status(201).send({ res: true });
};


let Login = async (req, res) => {

    var body = req.body;
    if (!body.gmail) {
        body.email = body.email.toLowerCase();
        let foundUser = await duplicateUserCheck(body.email);
        if (!foundUser) return res.status(403).send({ message: "Invalid E-mail" })
        var passwordValid = await bcrypt.compare(body.password, foundUser.password);
        if (!passwordValid) return res.status(403).send({ message: "Invalid Password" });
        var token = jwt.sign({ id: foundUser._id, isAdmin: foundUser.role }, "volt", { expiresIn: "24h" });
        res.header("x-auth-token", token);
        res.status(200).send({ token: token });
    } else {
        body.email = body.email.toLowerCase();
        let foundUser = await duplicateUserCheck(body.email);
        if (!foundUser) return res.status(403).send({ message: "Invalid E-mail" })
        var token = jwt.sign({
            id: foundUser._id,
            isAdmin: foundUser.role
        }, "volt", { expiresIn: "24h" });
        res.header("x-auth-token", token);
        res.status(200).send({ token: token });
    }


}

let ResetPasswordMail = async (req, res) => {
    let data = req.body
    let foundUser = await duplicateUserCheck(data.email);
    if (!foundUser) return res.status(403).send({ message: "Invalid E-mail" })

    transporter.sendMail({
        to: `${data.email}`,
        subject: "Password Resetting Request",
        html: `<div> 
        Hello ${foundUser.name},
        <br>
        <br>
        Forgot your password ?
        <br>
        We recieved a request to reset the password for your account.<br>
        To reset your password use the following <emp>OTP</emp>:
        <h1>${data.otp}<h1>  
        </div>`
    }).then(() => {
        res.status(200).json({ message: "reset mail sent successfully" })
    }).catch((err) => { console.log(err.message) })

}
let updateUserPassword = async (req, res) => {
    let data = req.body
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(data.password, salt);
    await UserModel.findOneAndUpdate({ email: data.email }, { password: hashedPassword })
    res.status(200).json({ message: "password updated" })
}


module.exports = {
    Register,
    Login,
    GetUserById,
    DecodeToken,
    ResetPasswordMail,
    updateUserPassword


};











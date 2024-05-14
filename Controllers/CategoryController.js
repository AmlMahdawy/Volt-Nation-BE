const CategoryModel = require("../Models/CategoryModel")

const CreateCategory = async (req, res) => {

    let { name, imgs, description } = req.body
    try {
        let category = new CategoryModel({ name: name.trim(), imgs, description, date: new Date().toUTCString() });
        await category.save()
        res.status(200).send(category)
    } catch (err) {
        res.send({ err })
    }

}
const UpdateCategory = async (req, res) => {

}
const DeleteCategory = async (req, res) => {

}
const AllCategories = async (req, res) => {
    let cats = await CategoryModel.find({})
    res.send(cats)
}
module.exports = {
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    AllCategories
}

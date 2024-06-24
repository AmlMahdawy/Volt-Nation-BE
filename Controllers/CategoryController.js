const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");

const CreateCategory = async (req, res) => {
    try {
        let { name, description } = req.body
        var files = req.files;
        let imgs = []
        files.forEach(fileObj => {
            imgs.push(fileObj.filename)
        });
        let category = new CategoryModel({ name: name.trim(), imgs, description, date: new Date().toUTCString() });
        await category.save()
        res.status(200).send(category)
    } catch (err) {
        res.send({ err })
    }
}
const UpdateCategory = async (req, res) => {
    let { name, description } = req.body
    let { catId } = req.params

    var files = req.files;
    let imgs = []
    files.forEach(fileObj => {
        imgs.push(fileObj.filename)
    });

    let category = await CategoryModel.findOneAndUpdate({ _id: catId }, { name: name.trim(), imgs, description })
    await category.save()
    res.status(200).send(category)

}
const DeleteCategory = async (req, res) => {
    let { catId } = req.params
    let category = await CategoryModel.findOne({ _id: catId }, { name: 1 })
    await ProductModel.deleteMany({ category: category.name })
    let deleted = await CategoryModel.findOneAndDelete()

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

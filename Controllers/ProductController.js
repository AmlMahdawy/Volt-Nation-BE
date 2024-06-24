const ProductModel = require("../Models/ProductModel");
const CategoryModel = require("../Models/CategoryModel");


let GetAllProducts = async (req, res, next) => {
  let Products = await ProductModel.find({});
  res.status(200).send(Products);
};

const UpdateProduct = async (req, res) => { }


const DeleteProduct = async (req, res) => {
  let { productId } = req.params
  try {
    let deleted = await ProductModel.findOneAndDelete({ _id: productId })
    await CategoryModel.findByIdAndUpdate({ name: product.category }, { $inc: { productsNum: -1 } })
    res.send(deleted)

  } catch (err) {
    res.se
  }

}


const AddProduct = async (req, res) => {

  let { name,
    description,
    category,
    features,
    price,
    colors,
    factoryName,
    quantity

  } = req.body

  var files = req.files;
  let imgs = []

  if (files) {
    files.forEach(fileObj => {
      imgs.push(fileObj.filename)
    });
  }


  let product = new ProductModel({
    name: name.trim(),
    imgs,
    description,
    releasedDate: new Date().toUTCString(),
    features,
    price,
    colors,
    factoryName,
    quantity,
    category
  });
  await product.save()
  let cat = await CategoryModel.findOneAndUpdate({ name: category }, { $inc: { productsNum: 1 } }, { new: true })

  res.status(200).send(product)

}

module.exports = {
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  AddProduct
};

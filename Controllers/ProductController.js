const ProductModel = require("../Models/ProductModel");

let GetAllProducts = async (req, res, next) => {
  let Products = await ProductModel.find({});
  res.status(200).send(Products);
};

const UpdateProduct = async (req, res) => { }
const DeleteProduct = async (req, res) => {

}


const AddProduct = async (req, res) => {

  let { name,
    description,
    category,
    features,
    price,
    colors,
    factoryName,
    quantity } = req.body

  var files = req.files;
  let imgs = []
  files.forEach(fileObj => {
    imgs.push(fileObj.filename)
  });



  let product = new ProductModel({
    name: name.trim(),
    imgs,
    description,
    releasedDate: new Date().toUTCString(),
    features,
    price,
    colors,
    factoryName,
    quantity
  });
  await product.save()
  res.status(200).send(product)

}

module.exports = {
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  AddProduct
};

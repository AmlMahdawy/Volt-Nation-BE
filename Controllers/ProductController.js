const ProductModel = require("../Models/ProductModel");

let GetAllProducts = async (req, res, next) => {
  let Products = await ProductModel.find({});
  res.status(200).send(Products);
};

const UpdateProduct = async (req, res) => { }
const DeleteProduct = async (req, res) => { }
const AddProduct = async (req, res) => { }

module.exports = {
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  AddProduct
};

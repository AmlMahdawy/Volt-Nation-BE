const ProductModel = require("../Models/ProductModel");

let GetAllProducts = async (req, res, next) => {
  let Products = await ProductModel.find({});
  res.status(200).send(Products);
};

module.exports = {
  GetAllProducts,
};

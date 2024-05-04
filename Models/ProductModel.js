const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  description: { type: String },
  features: { type: Array },
  price: { type: String },
  colors: { type: Array },
  reviews: [],
  releasedDate: { type: String },
  factoryName: { type: String },
  images: { type: Array },
  salesNum: { type: Number },
  quantity: { type: Number },
  id: { type: String },
});

module.exports = mongoose.model("Products", ProductSchema);

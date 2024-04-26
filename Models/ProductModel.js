const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  pName: { type: String },
  category: { type: String },
  description: { type: String },
  features: { type: Array },
  price: { type: String },
  colors: { type: Array },
  rating: { type: Number },
  releasedDate: { type: String },
  factoryName: { type: String },
  images: { type: Array },
  id: { type: String },
});

module.exports = mongoose.model("Products", ProductSchema);

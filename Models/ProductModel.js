const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  description: { type: String },
  features: { type: Array },
  price: { type: Number },
  colors: { type: Array },
  reviews: [],
  releasedDate: { type: String },
  brand: { type: String },
  factoryName: { type: String },
  images: { type: Array, default: ["https://static.vecteezy.com/system/resources/previews/012/607/994/non_2x/new-product-banner-ribbon-megaphone-icon-flat-design-illustration-on-white-background-vector.jpg", "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M="] },
  salesNum: { type: Number },
  quantity: { type: Number },
  id: { type: String },
  rate: { type: String, default: "4" }
});

module.exports = mongoose.model("Products", ProductSchema);

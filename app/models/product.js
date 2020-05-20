const mongoose = require("mongoose")

let product = mongoose.Schema({
  code: { type: String, unique: false, require: true },
  description: { type: String, require: true },
  productImage: { type: String, require: true },
  price: {
    type: Number,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true
  },
  fashion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fashion",
    require: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Product", product)
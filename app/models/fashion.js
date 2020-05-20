const mongoose = require("mongoose")

let fashion = mongoose.Schema({
  description: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Fashion", fashion)
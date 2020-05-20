const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const withAuth = require("../middlewares/auth")
const upload = require("../middlewares/multer")

router.get("/", async (req, res) => {
  try {
    let products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem requesting the products"
    })
  }
})

router.post("/", upload.single("image"), withAuth, async (req, res) => {

  let product = req.body
  product.productImage = req.file.path
  console.log(product)
  let new_product = new Product(product)
  try {
    await new_product.save()
    res.json(new_product)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem inserting the products"
    })
  }
})

router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json("ok")
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem deleting the products"
    })
  }
})

router.put("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { upsert: true, "true": true }
    )
    await product.save()
    res.json(product)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem deleting the products"
    })
  }
})

module.exports = router
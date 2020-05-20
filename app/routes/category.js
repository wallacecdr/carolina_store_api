var express = require('express');
var router = express.Router();
const Category = require("../models/category")
const withAuth = require("../middlewares/auth")

router.get('/', async (req, res) => {
  try {
    let categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem requesting the categories"
    })
  }
})

router.post("/", withAuth, async (req, res) => {
  let category = req.body
  let new_category = new Category(category)
  try {
    await new_category.save()
    res.json(new_category)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem inserting the category"
    })
  }
})

module.exports = router;

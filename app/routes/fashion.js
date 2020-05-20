var express = require('express');
var router = express.Router();
const Fashion = require("../models/fashion")
const withAuth = require("../middlewares/auth")

router.get('/', async (req, res) => {
  try {
    let fashions = await Fashion.find()
    res.json(fashions)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem requesting the fashions"
    })
  }
})

router.post("/", withAuth, async (req, res) => {
  let fashion = req.body
  let new_fashion = new Fashion(fashion)
  try {
    await new_fashion.save()
    res.json(new_fashion)
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "There was a problem inserting the fashion"
    })
  }
})

module.exports = router;

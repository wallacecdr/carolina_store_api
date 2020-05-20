var express = require('express');
var router = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const withAuth = require("../middlewares/auth")

require("dotenv").config()
const secret = process.env.JWT_TOKEN


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "Error registering new user" })
  }

})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ error: "Incorrect email or password" })
    } else {
      user.isCorrectPassword(password, function (error, same) {
        if (!same) {
          res.status(401).json({ error: "Incorrect email or password" })
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: "1d" })
          res.json({ user: user, token: token })
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal error, please try again" })
  }
})

router.put("/", withAuth, async (req, res) => {
  let idUser = req.user._id
  let body = req.body

  try {
    let user = await User.findByIdAndUpdate(
      idUser,
      body,
      { upsert: true, "new": true }
    )
    res.json(user)
  } catch (error) {
    res.status(401).json({
      message: "Error during update user",
      error: error
    })
  }
})

router.put("/password", withAuth, async (req, res) => {
  let idUser = req.user._id
  let { password } = req.body

  try {
    let user = await User.findOne({ _id: req.user._id })
    user.password = password
    user.save()
    res.json(user)
  } catch (error) {
    res.status(401).json({
      message: "Error on updating user password",
      error: error
    })
  }
})

router.delete("/", withAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id)
    res.json({ message: "OK" }).status(201)
  } catch (error) {
    res.status(500).json({
      message: "Error on deleting the user",
      error: error
    })
  }
})

module.exports = router;

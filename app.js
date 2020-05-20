var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors")

var app = express();

const productRouter = require("./app/routes/product")
var categoryRouter = require("./app/routes/category");
var fashionRouter = require("./app/routes/fashion");
var usersRouter = require("./app/routes/user");

require("./config/database")


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/uploads", express.static("uploads"))

app.use("/products", productRouter)
app.use("/categories", categoryRouter);
app.use("/fashions", fashionRouter)
app.use("/users", usersRouter);

module.exports = app;

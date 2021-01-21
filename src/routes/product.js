const route = require("express").Router();
const product = require("../controllers/product");
const { upload } = require("../helpers/uploadFile");

route.post("/createProduct", upload.array("image"), product.createProduct);

module.exports = route;

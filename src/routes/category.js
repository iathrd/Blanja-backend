const route = require("express").Router();
const category = require("../controllers/category");
const { upload } = require("../helpers/uploadFile");

route.post("/createCategory", upload.single("image"), category.createdCategory);

module.exports = route;

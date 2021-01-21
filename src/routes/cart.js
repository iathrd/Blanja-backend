const route = require("express").Router();
const cart = require("../controllers/cart");

route.post("/createCart", cart.createCart);
route.get("/listCart", cart.lisCart);

module.exports = route;

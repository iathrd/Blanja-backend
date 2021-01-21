const route = require("express").Router();
const cart = require("../controllers/cart");

route.post("/createCart", cart.createCart);
route.get("/listCart", cart.lisCart);
route.delete("/deleteCart/:id", cart.deleteCart);

module.exports = route;

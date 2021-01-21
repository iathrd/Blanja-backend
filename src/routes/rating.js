const route = require("express").Router();
const rating = require("../controllers/rating");

route.post("/createRating/:id", rating.createRating);

module.exports = route;

const { response } = require("../helpers/response");
const { Cart, Product, ProductImage } = require("../models");
const { pagination } = require("../helpers/pagination");
const { Op } = require("sequelize");

module.exports = {
  createCart: async (req, res) => {
    const { userId } = req.payload;
    try {
      const createCart = await Cart.create({ ...req.body, userId });
      if (createCart) {
        response(res, "Added to Bag");
      } else {
        response(res, "Failed add to bag", {}, false, 400);
      }
    } catch (error) {
      console.log(error);
    }
  },
  lisCart: async (req, res) => {
    try {
      const { search = "", limit = 3, page = 1 } = req.query;
      const offset = (page - 1) * limit;
      const { userId } = req.payload;
      const { count, rows } = await Cart.findAndCountAll({
        include: [
          {
            model: Product,
            as: "product",
            include: [{ model: ProductImage, as: "images" }],
          },
        ],
        where: {
          userId,
        },
        order: [["createdAt", "DESC"]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          "/cart/listCart",
          req.query,
          page,
          limit,
          count
        );
        response(res, "Cart list", { data: rows, pageInfo });
      } else {
        response(res, "You dont have Cart", { data: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.payload;
      const deleteCart = Cart.destroy({
        where: {
          [Op.and]: {
            id,
            userId,
          },
        },
      });
      if (deleteCart) {
        response(res, "Item deleted");
      } else {
        response(res, "Failed to delete Bag");
      }
    } catch (error) {}
  },
};

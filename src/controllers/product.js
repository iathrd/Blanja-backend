const { response } = require("../helpers/response");
const { pagination } = require("../helpers/pagination");
const { Product, ProductImage, Rating } = require("../models");
const { createProduct } = require("../helpers/validation");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { userId } = req.payload;
      const data = await createProduct.validateAsync(req.body);
      const sendProduct = await Product.create(data);

      if (sendProduct) {
        const images = req.files.map((data, index) => {
          return {
            productId: sendProduct.id,
            image: data.path.replace(/\\/g, "/"),
            indexOf: index,
            userId,
          };
        });
        const sendImage = await ProductImage.bulkCreate(images);
        if (sendImage) {
          response(res, "Product Created", {
            data: sendProduct.dataValues,
            images,
          });
        } else {
          response(res, "Failed to create product", {}, false, 400);
        }
      } else {
        response(res, "Failed to create product", {}, false, 400);
      }
    } catch (error) {
      console.log(error)
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, "Internal server error", {}, false, 500);
    }
  },
  listProduct: async (req, res) => {
    try {
      const { limit = 3, page = 1, sort = "price", sortTo = "ASC" } = req.query;
      const offset = (page - 1) * limit;
      const { userId } = req.payload;
      const { count, rows } = await Product.findAndCountAll({
        include: [{ model: ProductImage, as: "images" }],
        order: [[sort, sortTo]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          "/product/listProduct",
          req.query,
          page,
          limit,
          count
        );
        response(res, "Product list", { data: rows, pageInfo });
      } else {
        response(res, "data not found", { data: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },
  newProduct: async (req, res) => {
    try {
      const {
        limit = 3,
        page = 1,
        sort = "createdAt",
        sortTo = "DESC",
      } = req.query;
      const offset = (page - 1) * limit;
      const { userId } = req.payload;
      const { count, rows } = await Product.findAndCountAll({
        include: [{ model: ProductImage, as: "images" }],
        order: [[sort, sortTo]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          "/product/listProduct",
          req.query,
          page,
          limit,
          count
        );
        response(res, "Product list", { data: rows, pageInfo });
      } else {
        response(res, "data not found", { data: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },
  popularProduct: async (req, res) => {
    try {
      const {
        limit = 3,
        page = 1,
        sort = "createdAt",
        sortTo = "ASC",
      } = req.query;
      const offset = (page - 1) * limit;
      const { userId } = req.payload;
      const { count, rows } = await Product.findAndCountAll({
        include: [{ model: ProductImage, as: "images" }],
        order: [[sort, sortTo]],
        limit: +limit,
        offset: +offset,
      });
      if (rows) {
        const pageInfo = pagination(
          "/product/listProduct",
          req.query,
          page,
          limit,
          count
        );
        response(res, "Product list", { data: rows, pageInfo });
      } else {
        response(res, "data not found", { data: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

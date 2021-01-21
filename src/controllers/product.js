const { response } = require("../helpers/response");
const { pagination } = require("../helpers/pagination");
const { Product, ProductImage } = require("../models");
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
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, "Internal server error", {}, false, 500);
    }
  },
};

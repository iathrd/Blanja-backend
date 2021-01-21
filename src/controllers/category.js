const { response } = require("../helpers/response");
const { Category } = require("../models");
const { createCategorySchema } = require("../helpers/validation");

module.exports = {
  createdCategory: async (req, res) => {
    try {
      if (req.file !== undefined) {
        let { path } = req.file;
        path = path.replace(/\\/g, "/");
        req.body = {
          ...req.body,
          image: path,
        };
      }
      const data = await createCategorySchema.validateAsync(req.body);
      const sendData = await Category.create(data);
      if (sendData) {
        response(res, "Category created", { data: sendData.dataValues });
      } else {
        res(res, "Failed to create category", {}, false, 400);
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, "Internal server error", {}, false, 500);
    }
  },
};

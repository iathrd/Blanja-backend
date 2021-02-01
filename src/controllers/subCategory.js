const { response } = require('../helpers/response')
const { createSubCategory } = require('../helpers/validation')
const { SubCategory } = require('../models')

module.exports = {
  createSubCategory: async (req, res) => {
    try {
      const { categoryId } = req.params
      const data = await createSubCategory.validateAsync({ ...req.body, categoryId })
      const createData = await SubCategory.create(data)
      if (createData) {
        response(res, 'Sub category created', { data: createData.dataValues })
      } else {
        response(res, 'Failed to create sub category')
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  }
}

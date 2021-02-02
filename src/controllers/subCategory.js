const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const { createSubCategory, updateSubCategory } = require('../helpers/validation')
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
  },
  updateSubCategory: async (req, res) => {
    try {
      const { id } = req.params
      const data = await updateSubCategory.validateAsync(req.body)
      console.log(data)
      const updateData = await SubCategory.update(data, { where: { id } })
      if (updateData) {
        response(res, 'Update succesfuly', { data: data })
      } else {
        response(res, 'Updated failed', {}, false, 400)
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  getSubCategory: async (req, res) => {
    try {
      const { id } = req.params
      const findCategory = await SubCategory.findOne({ where: { id } })
      if (findCategory) {
        response(res, 'Sub category detail', { data: findCategory })
      } else {
        response(res, 'Data doest exist ', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  listSubCategory: async (req, res) => {
    try {
      const { limit = 20, page = 1 } = req.query
      const offset = (page - 1) * limit
      const { count, rows } = await SubCategory.findAndCountAll({
        order: [['name', 'ASC']],
        limit: +limit,
        offset: +offset
      })
      if (rows) {
        const pageInfo = pagination(
          '/subCategory/listSubCategory',
          req.query,
          page,
          limit,
          count
        )
        response(res, 'List category', { data: rows, pageInfo })
      } else {
        response(res, 'Data empty')
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 400)
    }
  }
}

const { response } = require('../helpers/response')
const { Category } = require('../models')
const {
  createCategorySchema,
  updateCategorySchema
} = require('../helpers/validation')
const { pagination } = require('../helpers/pagination')

module.exports = {
  createdCategory: async (req, res) => {
    try {
      if (req.file !== undefined) {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        req.body = {
          ...req.body,
          image: path
        }
      }
      const data = await createCategorySchema.validateAsync(req.body)
      const sendData = await Category.create(data)
      if (sendData) {
        response(res, 'Category created', { data: sendData.dataValues })
      } else {
        res(res, 'Failed to create category', {}, false, 400)
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id } = req.params
      if (req.file !== undefined) {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        req.body = {
          ...req.body,
          image: path
        }
      }
      const data = await updateCategorySchema.validateAsync(req.body)
      const updateData = await Category.update(data, { where: { id } })
      if (updateData) {
        response(res, 'Category updated')
      } else {
        response('Failed to update category')
      }
    } catch (error) {
      console.log(error)
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  getCategories: async (req, res) => {
    try {
      const { limit = 5, page = 1 } = req.query
      const offset = (page - 1) * limit
      const { count, rows } = await Category.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit: +limit,
        offset: +offset
      })
      if (rows) {
        const pageInfo = pagination(
          '/category/listCategory',
          req.query,
          page,
          limit,
          count
        )
        response(res, 'Category list', { data: rows, pageInfo })
      } else {
        response(res, 'Not found', { data: [] })
      }
    } catch (error) {
      console.log(error)
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params
      const { userId } = req.payload
      const deleteData = await Category.destroy({
        where: {
          id,
          userId
        }
      })
      if (deleteData) {
        response(res, 'Category deleted')
      } else {
        response(res, 'Delete failed')
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  }
}

const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const { Size } = require('../models')

module.exports = {
  createSize: async (req, res) => {
    try {
      const { userId } = req.payload
      console.log(req)
      const createSize = Size.create({ ...req.body, userId })
      if (createSize) {
        response(res, 'Size created', { data: createSize.dataValues })
      } else {
        response(res, 'Failed to create size', {}, false, 400)
      }
    } catch (error) {
      console.log(error)
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  editSize: async (req, res) => {
    try {
      const { id } = req.params
      const updateSize = await Size.update(req.body, { where: { id } })
      if (updateSize) {
        response(res, 'Size updated')
      } else {
        response(res, 'Failed to update size', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  }
}

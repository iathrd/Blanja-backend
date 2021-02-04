const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')
const { Size, SizeDetail, Color, ColorDetail } = require('../models')
const { sizeDetailsSchema, colorSchema, colorDetailSchema } = require('../helpers/validation')

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
  },
  getSize: async (req, res) => {
    try {
      const { id } = req.params
      const getSize = await Size.findOne({ where: { id } })
      if (getSize) {
        response(res, 'Size details', { data: getSize })
      } else {
        response(res, 'Failed to get data', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  deleteSize: async (req, res) => {
    try {
      const { id } = req.params
      const deleteSize = await Size.destroy({ where: { id } })
      if (deleteSize) {
        response(res, 'Size deleted')
      } else {
        response(res, 'Failed to deleted size', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  createSizeDetail: async (req, res) => {
    try {
      const { sizeId } = req.params
      const data = await sizeDetailsSchema.validateAsync(req.body)
      const sendData = await SizeDetail.create({ ...data, sizeId })
      if (sendData) {
        response(res, 'Size created', { data: sendData.dataValues })
      } else {
        response(res, 'Failed to create size', {}, false, 400)
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  updateSizeDetail: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = await SizeDetail.update(req.body, { where: { id } })
      if (updateData) {
        response(res, 'Size updated')
      } else {
        response(res, 'Failed to update size', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  getSizeDetail: async (req, res) => {
    try {
      const { id } = req.params
      const getData = await SizeDetail.findOne({ where: { id } })
      if (getData) {
        response(res, 'Size details', { data: getData })
      } else {
        response(res, 'Failed to get data', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  deleteSizeDetail: async (req, res) => {
    try {
      const { id } = req.params
      const deleteData = await SizeDetail.destroy({ where: { id } })
      if (deleteData) {
        response(res, 'Size deleted')
      } else {
        response(res, 'Failed to delete')
      }
    } catch (error) {
      response(res, 'Internal server error')
    }
  },
  createColor: async (req, res) => {
    try {
      const { userId } = req.payload
      const data = await colorSchema.validateAsync(req.body)
      const createData = await Color.create({ ...data, userId })
      if (createData) {
        response(res, 'Color created', { data: createData.dataValues })
      } else {
        response(res, 'Faield to create color', {}, false, 400)
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  updateColor: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = await Color.update(req.body, { where: { id } })
      if (updateData) {
        response(res, 'Color updated', { data: req.body })
      } else {
        response(res, 'Failed to update color')
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  getColor: async (req, res) => {
    try {
      const { id } = req.params
      const getData = await Color.findOne({ where: { id } })
      if (getData) {
        response(res, 'Color details', { data: getData })
      } else {
        response(res, `Color with id ${id} doest exist`, {}, false, 404)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  deleteColor: async (req, res) => {
    try {
      const { id } = req.params
      const deleteData = await Color.destroy({ where: { id } })
      if (deleteData) {
        response(res, 'Delete succesfuly')
      } else {
        response(res, 'Delete failed', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  createColorDetail: async (req, res) => {
    try {
      const { userId } = req.payload
      const { id } = req.params
      const data = await colorDetailSchema.validateAsync(req.body)
      const createdData = await ColorDetail.create({ ...data, userId, colorId: id })
      if (createdData) {
        response(res, 'Color created', { data: createdData.dataValues })
      } else {
        response(res, 'Failed to create Color', {}, false, 400)
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  updateColorDetail: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = await ColorDetail.update(req.body, { where: { id } })
      if (updateData) {
        response(res, 'Update succesfult', { data: req.body })
      } else {
        response(res, 'Failed to update color', {}, false, 400)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  }
}

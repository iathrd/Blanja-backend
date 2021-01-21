const { Adress } = require('../models')
const { response } = require('../helpers/response')
const {
  createAdressSchema,
  updateAdressSchema
} = require('../helpers/validation')
const { Op } = require('sequelize')

module.exports = {
  createAdress: async (req, res) => {
    try {
      const { userId } = req.payload
      if (req.body.isPrimary) {
        await Adress.update(
          { isPrimary: false },
          {
            where: {
              [Op.and]: {
                isPrimary: true,
                userId
              }
            }
          }
        )
      }
      const data = await createAdressSchema.validateAsync(req.body)
      const createAdress = await Adress.create({ ...data, userId })
      if (createAdress) {
        response(res, 'Adress created', { data: createAdress.dataValues })
      } else {
        response(res, 'Failed to create adress', {}, false, 500)
      }
    } catch (error) {
      console.log(error)
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  },
  updateAdress: async (req, res) => {
    try {
      const { userId } = req.payload
      const { id } = req.params
      if (req.body.isPrimary) {
        await Adress.update(
          { isPrimary: false },
          {
            where: {
              [Op.and]: {
                isPrimary: true,
                userId
              }
            }
          }
        )
      }
      const data = await updateAdressSchema.validateAsync(req.body)
      const update = await Adress.update(data, { where: { id } })
      if (update) {
        response(res, 'Adress updated')
      } else {
        response(res, 'Failed to update adress')
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  }
}

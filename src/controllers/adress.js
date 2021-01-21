const { Adress } = require('../models')
const { response } = require('../helpers/response')
const {
  createAdressSchema,
  updateAdressSchema
} = require('../helpers/validation')
const { Op } = require('sequelize')
const { pagination } = require('../helpers/pagination')

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
  },
  getAdress: async (req, res) => {
    try {
      const { id } = req.params
      const { userId } = req.payload
      const adress = await Adress.findOne({
        where: {
          [Op.and]: {
            id,
            userId
          }
        }
      })
      if (adress) {
        response(res, 'Adress detail', { data: adress.dataValues })
      } else {
        response(res, `Adress with id ${id} doesnt exist`)
      }
    } catch (error) {
      response(res, 'Internal server error', {}, false, 500)
    }
  },
  deleteAdress: async (req, res) => {
    try {
      const { id } = req.params
      const { userId } = req.payload
      const deleteAdress = await Adress.destroy({
        where: {
          [Op.and]: {
            id,
            userId
          }
        }
      })
      if (deleteAdress) {
        response(res, 'Delet succesfully')
      } else {
        response(res, 'Failed to delete adress', {}, false, 500)
      }
    } catch (error) {
      response(res, 'Failed to delete adress', {}, false, 500)
    }
  },
  listAdress: async (req, res) => {
    try {
      const { search = '', limit = 3, page = 1 } = req.query
      const offset = (page - 1) * limit
      const { userId } = req.payload
      const { count, rows } = await Adress.findAndCountAll({
        where: {
          userId,
          [Op.or]: {
            adress: {
              [Op.like]: `%${search}%`
            },
            saveAs: {
              [Op.like]: `%${search}%`
            },
            recipient: {
              [Op.like]: `%${search}%`
            },
            city: {
              [Op.like]: `%${search}%`
            },
            postalCode: {
              [Op.like]: `%${search}%`
            },
            phoneNumber: {
              [Op.like]: `%${search}%`
            }
          }
        },
        order: [['isPrimary', 'DESC']],
        limit: +limit,
        offset: +offset

      })
      if (rows) {
        const pageInfo = pagination(
          '/adress/listAdress',
          req.query,
          page,
          limit,
          count
        )
        response(res, 'Adress list', { data: rows, pageInfo })
      } else {
        response(res, 'You dont have adress', { data: [] })
      }
    } catch (error) {
      response(res, 'Cant get Adress', {}, false, 500)
    }
  }
}

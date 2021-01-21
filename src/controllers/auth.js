/* eslint-disable no-case-declarations */
const { response } = require('../helpers/response')
const { createSeller } = require('../helpers/validation')
const { User } = require('../models')
const argon = require('argon2')

module.exports = {
  createUser: async (req, res) => {
    try {
      const { role } = req.params
      const data = await createSeller.validateAsync(req.body)
      const findEmail = await User.findOne({ where: { email: data.email } })
      if (findEmail) {
        response(res, `Email ${data.email} already registered!`)
      } else {
        const hashPassword = await argon.hash(data.password)
        switch (role) {
          case 'custommer':
            const sendData = await User.create({ ...data, password: hashPassword })
            if (sendData) {
              response(res, 'Register succesfully', {
                data: { ...sendData.dataValues, password: undefined }
              })
            } else {
              response(res, 'Internal server error', {}, false, 500)
            }
            break

          default:
            response(res, 'Not found', {}, false, 404)
            break
        }
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  }
}

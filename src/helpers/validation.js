const Joi = require('joi')

module.exports = {
  createSeller: Joi.object({
    username: Joi.string().trim().min(5).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required()
  })
}

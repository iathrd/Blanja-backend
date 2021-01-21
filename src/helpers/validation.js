const Joi = require('joi')

module.exports = {
  createSeller: Joi.object({
    name: Joi.string().trim().min(5).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required()
  }),
  updateUser: Joi.object({
    name: Joi.string().trim().min(5),
    email: Joi.string().trim().email(),
    password: Joi.string().min(8),
    avatar: Joi.string(),
    gender: Joi.string(),
    birthDay: Joi.string()
  }),
  changePasswordSchema: Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required()
  })
}

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
  }),
  createAdressSchema: Joi.object({
    saveAs: Joi.string().trim().min(4).required(),
    recipient: Joi.string().trim().min(4).required(),
    adress: Joi.string().trim().min(5).required(),
    city: Joi.string().trim().min(4).required(),
    postalCode: Joi.string().trim().min(5).max(5).required(),
    phoneNumber: Joi.string().trim().min(12).max(13).required()
  })
}

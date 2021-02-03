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
    phoneNumber: Joi.string().trim().min(12).max(13).required(),
    isPrimary: Joi.boolean()
  }),
  updateAdressSchema: Joi.object({
    saveAs: Joi.string().trim().min(4),
    recipient: Joi.string().trim().min(4),
    adress: Joi.string().trim().min(5),
    city: Joi.string().trim().min(4),
    postalCode: Joi.string().trim().min(5).max(5),
    phoneNumber: Joi.string().trim().min(12).max(13),
    isPrimary: Joi.boolean()
  }),
  createCategorySchema: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required()
  }),
  updateCategorySchema: Joi.object({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string()
  }),
  createProduct: Joi.object({
    name: Joi.string().min(4).required(),
    price: Joi.number().required(),
    description: Joi.string().min(4).required(),
    brand: Joi.string().min(4).required(),
    size: Joi.string().required(),
    color: Joi.string().required()
  }),
  createSubCategory: Joi.object({
    name: Joi.string().min(4).required(),
    categoryId: Joi.number().required(),
    description: Joi.string().min(5).required()
  }),
  updateSubCategory: Joi.object({
    name: Joi.string().min(4),
    description: Joi.string().min(5)
  }),
  sizeDetailsSchema: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
}

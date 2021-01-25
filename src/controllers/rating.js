const { response } = require('../helpers/response')
const { Rating } = require('../models')
module.exports = {
  createRating: async (req, res) => {
    try {
      const { id } = req.params
      const { userId } = req.payload
      const sendRating = await Rating.create({
        ...req.body,
        productId: id,
        userId
      })
      if (sendRating) {
        response(res, 'Rating crated')
      } else {
        response(res, 'Failed to make rating', {}, false, 400)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

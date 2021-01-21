const { response } = require('../helpers/response')
const { createSeller } = require('../helpers/validation')

module.exports = {
  createUser: async (req, res) => {
    try {
      const { role } = req.params
      const data = await createSeller.validateAsync(req.body)
      switch (role) {
        case 'custommer':
          break

        default:
          break
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, 'Internal server error', {}, false, 500)
    }
  }
}

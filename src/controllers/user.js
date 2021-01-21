const { response } = require('../helpers/response')
const { updateUser } = require('../helpers/validation')
const { User, UserDetail } = require('../models')

module.exports = {
  updateUser: async (req, res) => {
    try {
      const { role, id } = req.params
      const { userId } = req.payload
      if (req.file !== undefined) {
        let { path } = req.file
        path = path.replace(/\\/g, '/')
        req.body = {
          ...req.body,
          avatar: path
        }
      }
      const data = await updateUser.validateAsync(req.body)
      const { name, email, password, ...userDetails } = data
      const { avatar, gender, birthDay, storeName, ...userData } = data
      switch (role) {
        case 'custommer':
          if (Object.keys(userDetails).length && Object.keys(userData).length) {
            const updateDetail = await UserDetail.update(userDetails, { where: { id } })
            if (updateDetail) {
              const updateUser = User.update(userData, { where: { id: userId } })
              if (updateUser) {
                response(res, 'Update succesfully', { data: { ...updateDetail.dataValues, detailId: id } })
              } else {
                response(res, 'Internal server error', {}, false, 500)
              }
            } else {
              response(res, 'Internal server error', {}, false, 500)
            }
          } else if (Object.keys(userData).length) {
            const updateUser = await User.update(userData, { where: { id: userId } })
            if (updateUser) {
              response(res, 'userUpdated')
            } else {
              response(res, 'Internal server error', {}, false, 500)
            }
          } else {
            const updateDetail = await UserDetail.update(userDetails, { where: { id: id } })
            if (updateDetail) {
              response(res, 'Update details sucesfully', { data: userDetails })
            } else {
              response(res, 'Internal server error', {}, false, 500)
            }
          }
          break

        default:
          response(res, 'Not found', {}, 404)
          break
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, 400)
        : response(res, 'Internal server error', {}, 500)
    }
  }
}

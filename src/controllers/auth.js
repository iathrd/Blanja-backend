/* eslint-disable no-case-declarations */
const { response } = require("../helpers/response");
const { createSeller } = require("../helpers/validation");
const { User, UserDetail } = require("../models");
const { signAccesToken } = require("../helpers/jwt_init");
const argon = require("argon2");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { role } = req.params;
      const data = await createSeller.validateAsync(req.body);
      const findEmail = await User.findOne({ where: { email: data.email } });
      if (findEmail) {
        response(
          res,
          `Email ${data.email} already registered!`,
          {},
          false,
          400
        );
      } else {
        const hashPassword = await argon.hash(data.password);
        switch (role) {
          case "custommer":
            const dataUser = await User.create({
              ...data,
              password: hashPassword,
            });
            if (dataUser) {
              const userDetails = await UserDetail.create({
                userId: dataUser.id,
              });
              if (userDetails) {
                response(res, "Register succesfully", {
                  data: { ...dataUser.dataValues, password: undefined },
                });
              } else {
                response(res, "Internal server error", {}, false, 500);
              }
            } else {
              response(res, "Internal server error", {}, false, 500);
            }

            break;

          default:
            response(res, "Not found", {}, false, 404);
            break;
        }
      }
    } catch (error) {
      error.isJoi
        ? response(res, error.message, {}, false, 400)
        : response(res, "Internal server error", {}, false, 500);
    }
  },
  login: async (req, res) => {
    try {
      const { role } = req.params;
      switch (role) {
        case "custommer":
          const { email, password } = req.body;
          const findUser = await User.findOne({ where: { email } });
          if (findUser) {
            const validatePassword = await argon.verify(
              findUser.password,
              password
            );
            if (validatePassword) {
              const token = await signAccesToken(findUser.id);
              response(res, "Login succesfullt", { token });
            } else {
              response(res, "Invalid email or password", {}, false, 400);
            }
          } else {
            response(res, "Invalid email or password", {}, false, 400);
          }
          break;
        default:
          response(res, "Not found", {}, false, 404);
          break;
      }
    } catch (error) {
      error && response(res, "Internal server error", {}, false, 500);
    }
  },
};

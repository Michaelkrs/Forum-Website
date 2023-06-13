const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const main = require("../helpers/nodemailer");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const user = await User.create({
        username,
        email,
        password,
      });

      main(email);

      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          name: "noInput",
        };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          name: "loginFailed",
        };
      }

      const passwordValidation = comparePassword(password, user.password);

      if (!passwordValidation) {
        throw {
          name: "loginFailed",
        };
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      res.status(200).json({
        access_token: token,
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googlefindOrCreate(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID,
      });
      // payload is logged in user data
      const payload = ticket.getPayload();

      // sequelize function find user or create if not exists
      const [user] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        // this is create
        defaults: {
          username: payload.email,
          email: payload.email,
          password: "google_password",
        },
        // ignore hooks
        hooks: false,
      });

      if (!user) {
        throw {
          name: "userNotFound",
        };
      }

      const token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({
        access_token: token,
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;

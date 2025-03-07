const UserService = require('../services/UserService');

class AuthController {
  static async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { token, user } = await UserService.login(req.body);
      res.cookie('token', token, { httpOnly: true }).json(user);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
// Interacting with the database using Sequelize to save or find users

const User = require('../models/User');

class UserRepository {
  static async create(userData) {
    return User.create(userData);
  }

  static async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async findById(id) {
    return User.findByPk(id);
  }
}

module.exports = UserRepository;
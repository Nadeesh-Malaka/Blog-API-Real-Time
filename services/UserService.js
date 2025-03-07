const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');
require('dotenv').config();

class UserService {
  static async register({ username, email, password }) {
    const user = await UserRepository.create({ username, email, password });
    return new UserDTO(user);
  }

  static async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: new UserDTO(user) };
  }
}

module.exports = UserService;
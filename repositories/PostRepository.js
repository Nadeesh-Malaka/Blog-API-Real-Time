const Post = require('../models/Post');
const sequelize = require('../config/database');

class PostRepository {
  static async create(postData) {
    return sequelize.transaction(async (t) => {
      return Post.create(postData, { transaction: t });
    });
  }

  static async findAll() {
    return Post.findAll();
  }

  static async findById(id) {
    return Post.findByPk(id);
  }

  static async update(id, postData) {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    return post.update(postData);
  }

  static async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    return post.destroy();
  }
}

module.exports = PostRepository;
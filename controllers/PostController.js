const PostService = require('../services/PostService');

class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createPost(req, res) {
    try {
      const post = await PostService.createPost({ ...req.body, userId: req.user.id });
      req.io.emit('postCreated', post); // WebSocket broadcast
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getPostById(req, res) {
    try {
      const post = await PostService.getPostById(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updatePost(req, res) {
    try {
      const post = await PostService.updatePost(req.params.id, req.body, req.user.id);
      req.io.emit('postUpdated', post);
      res.json(post);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }

  static async deletePost(req, res) {
    try {
      const result = await PostService.deletePost(req.params.id, req.user.id);
      req.io.emit('postDeleted', result);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
}

module.exports = PostController;
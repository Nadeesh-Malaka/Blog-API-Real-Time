const PostRepository = require('../repositories/PostRepository');
const PostDTO = require('../dtos/PostDTO');

class PostService {
  static async createPost({ title, content, userId }) {
    const post = await PostRepository.create({ title, content, userId });
    return new PostDTO(post);
  }

  static async getAllPosts() {
    const posts = await PostRepository.findAll();
    return posts.map(post => new PostDTO(post));
  }

  static async getPostById(id) {
    const post = await PostRepository.findById(id);
    if (!post) throw new Error('Post not found');
    return new PostDTO(post);
  }

  static async updatePost(id, { title, content }, userId) {
    const post = await PostRepository.findById(id);
    if (!post || post.userId !== userId) throw new Error('Unauthorized or post not found');
    const updatedPost = await PostRepository.update(id, { title, content });
    return new PostDTO(updatedPost);
  }

  static async deletePost(id, userId) {
    const post = await PostRepository.findById(id);
    if (!post || post.userId !== userId) throw new Error('Unauthorized or post not found');
    await PostRepository.delete(id);
    return { id };
  }
}

module.exports = PostService;
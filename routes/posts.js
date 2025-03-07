const express = require('express');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middleware/auth');
const { validate, postSchema } = require('../middleware/validate');
const router = express.Router();

router.get('/', PostController.getAllPosts);
router.post('/', authMiddleware, validate(postSchema), PostController.createPost);
router.get('/:id', PostController.getPostById);
router.put('/:id', authMiddleware, validate(postSchema), PostController.updatePost);
router.delete('/:id', authMiddleware, PostController.deletePost);

module.exports = router;
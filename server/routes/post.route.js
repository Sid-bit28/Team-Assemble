const express = require('express');

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require('../controllers/post.controller');

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);

module.exports = router;

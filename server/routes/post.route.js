const express = require('express');

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
} = require('../controllers/post.controller');

const router = express.Router();

router.get('/upload-auth', uploadAuth);

router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);

module.exports = router;

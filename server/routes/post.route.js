const express = require('express');

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} = require('../controllers/post.controller');
const increaseVisit = require('../middlewares/increaseVisits');

const router = express.Router();

router.get('/upload-auth', uploadAuth);

router.get('/', getPosts);
router.get('/:slug', increaseVisit, getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/feature', featurePost);

module.exports = router;

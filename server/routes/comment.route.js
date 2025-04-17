const express = require('express');
const router = express.Router();

const {
  getPostComments,
  addComment,
  deleteComment,
} = require('../controllers/comment.controller');

router.get('/:postId', getPostComments);
router.post('/:postId', addComment);
router.delete('/:id', deleteComment);

module.exports = router;

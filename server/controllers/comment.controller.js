const commentModel = require('../models/comment.model');
const userModel = require('../models/user.model');

const getPostComments = async (req, res) => {
  const comments = await commentModel
    .find({ post: req.params.postId })
    .populate('user', 'username img')
    .sort({ createdAt: -1 });
  res.status(200).json(comments);
};

const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;
  if (!clerkUserId) {
    return res.status(401).json('Not Authenticated.');
  }

  const user = await userModel.findOne({ clerkUserId });

  const newComment = new commentModel({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();
  res.status(201).json({ savedComment });
};

const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;
  if (!clerkUserId) {
    return res.status(401).json('Not Authenticated.');
  }

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role === 'admin') {
    await commentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json('Comment deleted by admin.');
  }

  const user = await userModel.findOne({ clerkUserId });

  const deletedComment = await commentModel.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json('You can delete only your comment.');
  }
  return res.status(200).json('Comment deleted.');
};

module.exports = {
  getPostComments,
  addComment,
  deleteComment,
};

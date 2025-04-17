const userModel = require('../models/user.model');

const getUserSavedPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json('Not Authenticated!');
  }

  const user = await userModel.findOne({ clerkUserId });
  res.status(200).json(user.savedPosts);
};

const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json('Not Authenticated!');
  }

  const user = await userModel.findOne({ clerkUserId });
  const isSaved = user.savedPosts.some(p => p === postId);

  if (!isSaved) {
    await userModel.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await userModel.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? 'Post unsaved' : 'Post saved');
};

module.exports = {
  getUserSavedPost,
  savePost,
};

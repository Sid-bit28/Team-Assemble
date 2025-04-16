const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const getPosts = async (req, res) => {
  const posts = await postModel.find();
  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const post = await postModel.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json('User not authenticated.');
  }

  const user = userModel.findOne({ clerkUserId });

  const newPost = new postModel({ user: user._id, ...req.body });
  const post = await newPost.save();
  res.status(201).json(post);
};

const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json('User not authenticated.');
  }
  const user = userModel.findOne({ clerkUserId });
  const deletedPost = await postModel.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletePost) {
    return res.status(403).json('You can delete only your posts.');
  }
  res.status(200).json('Post has been deleted.');
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};

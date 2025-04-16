const postModel = require('../models/post.model');

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new postModel(req.body);
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Post has been deleted.');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};

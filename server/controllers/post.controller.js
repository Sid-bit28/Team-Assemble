const ImageKit = require('imagekit');

const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await postModel
    .find()
    .populate('user', 'username')
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await postModel.countDocuments();
  const hasMore = page * limit < totalPosts;
  res.status(200).json({ posts, hasMore });
};

const getPost = async (req, res) => {
  const post = await postModel
    .findOne({ slug: req.params.slug })
    .populate('user', 'username img');
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json('User not authenticated.');
  }

  const user = await userModel.findOne({ clerkUserId });

  let slug = req.body.title.replace(/ /g, '-').toLowerCase();
  let existingPost = await postModel.findOne({ slug });

  let counter = 2;
  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await postModel.findOne({ slug });
    counter++;
  }

  const newPost = new postModel({ user: user._id, slug, ...req.body });
  const post = await newPost.save();
  res.status(201).json(post);
};

const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json('User not authenticated.');
  }

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role === 'admin') {
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json('Post deleted by admin.');
  }

  const user = userModel.findOne({ clerkUserId });
  const deletedPost = await postModel.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json('You can delete only your posts.');
  }
  res.status(200).json('Post has been deleted.');
};

const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json('User not authenticated.');
  }

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role !== 'admin') {
    return res.status(403).json('Cannot feature posts.');
  }

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json('Post not found.');
  }

  const isFeatured = post.isFeatured;
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
};

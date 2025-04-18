const ImageKit = require('imagekit');

const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {};
  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: 'i' };
  }

  if (author) {
    const user = await userModel.findOne({ username: author }).select('_id');
    if (!user) {
      return res.status(404).json('No post found.');
    }

    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case 'Newest':
        sortObj = { createdAt: -1 };
        break;
      case 'Oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'Popular':
        sortObj = { visit: -1 };
        break;
      case 'Trending':
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  const posts = await postModel
    .find(query)
    .populate('user', 'username')
    .sort(sortObj)
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

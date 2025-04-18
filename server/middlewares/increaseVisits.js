const postModel = require('../models/post.model');

const increaseVisit = async (req, res, next) => {
  const slug = req.params.slug;
  await postModel.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });
  next();
};

module.exports = increaseVisit;

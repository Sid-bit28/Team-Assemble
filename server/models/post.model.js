const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'general',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);

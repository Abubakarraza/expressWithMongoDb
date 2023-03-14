const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
const Blog = new mongoose.model('blogs', blogSchema);
module.exports = Blog;

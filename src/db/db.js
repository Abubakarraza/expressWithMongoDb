const User = require('../schema/authSchema');
const Blog = require('../schema/blogSchema');

exports.collections = {
  blog: Blog,
  user: User,
};

const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const {
  getAllBlog, getBlogById, searchBlog, addBlog,
} = require('./blog');

const router = express.Router();
router.get('/blog', authenticate, getAllBlog);
router.get('/blog/:id', authenticate, getBlogById);
router.get('/searchBlog', authenticate, searchBlog);
router.post('/addBlog', authenticate, addBlog);
module.exports = router;

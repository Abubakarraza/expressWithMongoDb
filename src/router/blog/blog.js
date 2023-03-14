/* eslint-disable new-cap */
const checkId = require('../../util/checkId');

exports.getAllBlog = async (req, res) => {
  try {
    const data = await db.blog.find();
    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    console.error('error:', error);
    res.status(404).json({ message: 'Something went Wrong', error });
  }
};
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const Idcheck = checkId(id);
    if (!Idcheck) {
      res.status(404).json({ message: 'Invaid Id' });
    } else {
      const data = await db.blog.findOne({ _id: id });
      if (data) {
        res.status(200).json({ mesage: 'Success', data });
      } else {
        res.status(404).json({ mesage: 'Data is not found', data });
      }
    }
  } catch (error) {
    console.log('error:', error);
    res.status(400).json({ mesage: 'Something Went Wrong', error });
  }
};
exports.searchBlog = async (req, res) => {
  try {
    const data = await db.blog.find(req.query);
    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    console.log('error:', error);
  }
};
exports.addBlog = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    if (title && content && author) {
      const newBlog = new db.blog({ title, content, author });
      await newBlog.save();
      res.status(201).json({ message: 'Successfully added new Blog' });
    } else {
      res.status(400).json({ message: 'Please type all field' });
    }
  } catch (error) {
    res.status(404).json({ message: 'error Occured', error });
    console.log(error);
  }
};

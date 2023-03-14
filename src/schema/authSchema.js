/* eslint-disable func-names */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
    trim: true,
  },
  Sname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email must be Unique'],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  resetPasswordOtp: String,
  resetPasswordExpire: Date,
});
authSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
authSchema.pre('updateOne', async function (next) {
  const update = this.getUpdate();
  if (update.$set.password && update.$set.password !== '') {
    update.$set.password = await bcrypt.hash(update.$set.password, 10);
  }
  next();
});
authSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY);
    this.tokens = this.tokens.concat({
      token,
    });
    await this.save();
    return token;
  } catch (error) {
    console.error('error:', error);
  }
};
const User = new mongoose.model('Users', authSchema);
module.exports = User;

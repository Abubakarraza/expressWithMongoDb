const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const { deleteUser } = require('./deleteUser/deleteUser');
const { logout } = require('./logout/logout');
const { changePassword } = require('./changePassword/changepassword');
const { signIn } = require('./signIn/signIn');
const { signUp } = require('./signUp/signUp');
const { forgotPassword } = require('./forgotPassword/forgotPassword');
const { verifyOtp } = require('./verfiyOtp/verifyOtp');
const { verifyToken } = require('./verfiyToken/verifyToken');

const router = express.Router();
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/logout', logout);
router.delete('/deleteUser', deleteUser);
router.patch('/changePassword', authenticate, changePassword);
router.post('/forgotPassword', forgotPassword);
router.get('/verifyOtp', verifyOtp);
router.get('/verifyToken/:token', verifyToken);
module.exports = router;

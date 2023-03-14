exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (token) {
      const user = await db.user.findOne({
        resetPasswordOtp: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (user) {
        res.status(200).json({ message: 'User verified' });
      } else {
        res.status(400).json({ message: 'User is not verified' });
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

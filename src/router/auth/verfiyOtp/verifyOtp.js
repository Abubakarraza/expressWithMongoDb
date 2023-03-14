exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp) {
      const user = await db.user.findOne({
        resetPasswordOtp: otp,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (user) {
        res.status(200).json({ message: 'Verify Otp' });
      }
      if (!user) {
        res.status(400).json({ message: 'Invaid otp or otp is expire' });
      }
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

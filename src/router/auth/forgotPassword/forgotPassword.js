const { emailTemplate } = require('../../../util/emailTemplate');
const { forgotPasswordData } = require('../../../util/forgotPasswordData');
const { sendEmail } = require('../../../util/sendEmail');

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await db.user.findOne({ email });
      if (user) {
        const otp = Math.random().toString(36).substr(2, 15);
        await db.user.findByIdAndUpdate(user._id, {
          resetPasswordOtp: otp,
          resetPasswordExpire: Date.now() + 3600000, // 1 hour
        });
        const data = { otp, ...forgotPasswordData };
        const htmlTemplate = emailTemplate(data);
        await sendEmail({
          to: email,
          subject: 'Forgot Password',
          html: htmlTemplate,
        });
        res.status(200).json({ message: 'Successfully Sent Email' });
      } else {
        res.status(400).json({ message: 'No user exist with this email' });
      }
    } else {
      res
        .status(400)
        .json({ message: 'Email must be required to reset password' });
    }
  } catch (error) {
    res.status(404).json({ error });
    console.log('error:', error);
  }
};

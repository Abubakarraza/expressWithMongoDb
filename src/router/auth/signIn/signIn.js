const { checkExistingEmail } = require('../../../util/checkExistingEmail');
const { comparePassword } = require('../../../util/comparePassword');
const { ValidateEmail } = require('../../../util/validateEmail');

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Please type all field' });
    } else if (!ValidateEmail(email)) {
      res.status(400).json({ message: 'Invalid Email' });
    } else {
      const User = await checkExistingEmail(email);
      if (!User) {
        res.status(400).json({ message: 'Invalid Crediential' });
      } else {
        const passwordChecker = await comparePassword(password, User?.password);
        if (!passwordChecker) {
          res.status(400).json({ message: 'Invalid Credientials' });
        } else if (passwordChecker && User) {
          const token = await User.generateAuthToken();
          res.cookie('token', token);
          res
            .status(400)
            .json({ message: 'User is Successfully login', data: User });
        } else {
          res.status(400).json({ message: 'User is not login' });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

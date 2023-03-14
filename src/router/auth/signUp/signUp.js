const { checkExistingEmail } = require('../../../util/checkExistingEmail');
const { ValidateEmail } = require('../../../util/validateEmail');

exports.signUp = async (req, res) => {
  const {
    Fname, Sname, email, password,
  } = req.body;
  try {
    if (!email || !Fname || !Sname || !password) {
      res.status(404).json({ message: 'Please type all field' });
    } else if (!ValidateEmail(email)) {
      res.status(404).json({ message: 'Invalid Email' });
    } else if (password.length < 8) {
      res.status(404).json({ message: 'Password must be 8 character' });
    } else {
      const checkEmail = await checkExistingEmail(email);
      if (checkEmail) {
        res.status(200).json({ message: 'Email Already Exist' });
      } else {
        // eslint-disable-next-line new-cap
        const newUser = new db.user({
          email, password, Fname, Sname,
        });
        await newUser.save();
        res.status(201).json({
          message: 'Successfully Created User',
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      message: 'Something Went Wrong,Please try again Later',
      error,
    });
    console.log('error:', error);
  }
};

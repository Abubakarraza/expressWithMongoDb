const { comparePassword } = require('../../../util/comparePassword');

exports.deleteUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Please type all fields' });
    } else {
      const data = await db.user.findOne({ email });
      if (data) {
        const hashPassword = await comparePassword(password, data.password);
        if (hashPassword && data) {
          const delUser = await db.user.deleteOne({
            _id: data._id,
          });
          if (delUser.deletedCount > 0) {
            res.status(200).json({ message: 'User successfully deleted' });
          } else {
            res
              .status(401)
              .json({ message: 'Something went wrong ,Try again later' });
          }
        } else {
          res.status(400).json({ message: 'Invalid Credientials' });
        }
      } else {
        res
          .status(200)
          .json({ message: 'No user exists with this email address' });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

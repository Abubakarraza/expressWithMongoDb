const { comparePassword } = require('../../../util/comparePassword');

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword && newPassword) {
      const { _id, password: existPassword, email } = req.rootUser;
      const hashPassword = await comparePassword(oldPassword, existPassword);
      if (hashPassword) {
        const updatePassword = await db.user.updateOne(
          { _id, email },
          {
            $set: {
              password: newPassword,
            },
          },
        );
        if (updatePassword.modifiedCount > 0) {
          res.status(200).json({ message: 'Successfully updated password' });
        } else {
          res
            .status(400)
            .json({ message: 'Something went wrong please try again later' });
        }
      } else {
        res.status(400).json({ message: 'please type valid old Password' });
      }
    } else {
      res.status(200).json({ message: 'OldPassword and newPassword  must be required' });
    }
  } catch (error) {
    console.log('error:', error);
  }
};

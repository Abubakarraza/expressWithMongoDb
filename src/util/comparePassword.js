const bcrypt = require('bcryptjs');
exports.comparePassword = async (userPassword, existPassword) => {
  const checkPassword = await bcrypt.compare(userPassword, existPassword);
  if (checkPassword) {
    return checkPassword;
  } else return null;
};

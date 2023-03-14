exports.checkExistingEmail = async (email) => {
  const CheckExistingEmail = await db.user.findOne({ email });
  if (CheckExistingEmail) {
    return CheckExistingEmail;
  } else {
    return null;
  }
};

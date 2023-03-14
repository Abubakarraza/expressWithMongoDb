exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'User Successfully Logout' });
  } catch (error) {
    console.error('error:', error);
    res.status(401).json({ message: 'User is not logout', error });
  }
};

const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (token) {
      const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
      const rootUser = await db.user.findOne({
        _id: verifyToken?._id,
        'tokens.token': token,
      });
      if (rootUser) {
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        req.user = verifyToken;

        next();
      }
    } else {
      res.status(400).json({ message: 'User not Found' });
    }
  } catch (error) {
    res.status(404).json({ error });
    console.error('error:', error);
  }
};

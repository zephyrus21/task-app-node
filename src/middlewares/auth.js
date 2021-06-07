const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'zephyrus21');
    const user = await User.findOne({
      _id: decodedToken._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = auth;
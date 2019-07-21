const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function, next so it moves on to the next middlware
module.exports = function(req, res, next) {
  //get the token from header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token if exist
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

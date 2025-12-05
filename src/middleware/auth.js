const functions = require('../utils/functions');
const {statusCodes} = require('../utils/response');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = functions.jwtVerify(token);
    req.user = payload;
    req.user.userId = payload._id;
    next();
  } catch (err) {
    return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Invalid or expired token' });
  }
};

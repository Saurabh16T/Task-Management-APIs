const functions = require('../utils/functions');
const UserModel = require('../models/User');
const {statusCodes} = require('../utils/response');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const decoded = functions.jwtVerify(token);

    let doc = null, role = "";
    if (decoded != null) {
      user = await UserModel.findOne({ _id: decoded.userId });

      if(!user) return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Unauthorized' });

      req.user = user;
    }
    else{
      return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(statusCodes.UN_AUTHORIZED).json({ message: 'Invalid or expired token' });
  }
};

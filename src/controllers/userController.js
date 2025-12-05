const UserModel = require('../models/User');
const functions = require('../utils/functions');
const { statusCodes, sendResponse } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error('Email already registered')

    const hashed = await functions.hash(password, 10)
    const user = new UserModel({ name, email, password: hashed });
    await user.save();

    sendResponse(req,res,'User registered successfully',user,statusCodes.CREATED)
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await functions.compareHash(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = await functions.jwtSign(payload);

    sendResponse(req,res,'User registered successfully',{token})

  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };

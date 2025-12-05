const mongoose = require('mongoose');
const constants = require('../utils/constants')

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: Object.values(constants.TASK_PRIORITY), default: constants.TASK_PRIORITY.LOW },
  status: { type: String, enum: Object.values(constants.TASK_STATUS), default: constants.TASK_STATUS.PENDING },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

module.exports = mongoose.model('tasks', schema);

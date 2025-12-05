const TaskModel = require('../models/Task');
const {statusCodes, sendResponse} = require('../utils/response');
const messages = require('../utils/messages')

const createTask = async (req, res, next) => {
  try {
    req.body.userId = req.user._id
    const task = await TaskModel.create(req.body)
    sendResponse(req,res,messages.TASK_CREATED_SUCCESSFULLY,task,statusCodes.CREATED)
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, priority, sort } = req.query;
    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

    // Filter stage
    const filter = { userId: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Sorting stage
    let sortObj = { createdAt: -1 };
    if (sort) {
      const [field, order] = sort.split(':');
      sortObj = { [field]: order === 'asc' ? 1 : -1 };
    }

    const pipeline = [
      {
        $match: filter
      },
      {
        $sort: sortObj
      },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          results: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: 1,
          list: { $slice: ["$results", skip, parseInt(limit)] },
        },
      }
    ]

    const result = await TaskModel.aggregate(pipeline);
    const total = result[0]?.totalCount || 0;
    const tasks = result[0]?.list || [];

    const data = { total, page: parseInt(page), limit: parseInt(limit), tasks };

    sendResponse(req, res, messages.DATA_FETCHED_SUCCESS, data);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findOne({ _id: id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    sendResponse(req,res,messages.DATA_FETCHED_SUCCESS,task)
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await TaskModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: messages.DATA_NOT_FOUND });

    sendResponse(req,res,messages.DATA_FETCHED_SUCCESS,updated)
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await TaskModel.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: messages.DATA_NOT_FOUND });
    sendResponse(req,res,messages.DELETE_SUCCESS)
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };

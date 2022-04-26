const asyncHandler = require('express-async-handler');
const Goal = require('../model/goals');
const User = require('../model/user');

// @desc Get goals
// @route GET /api/goals
// @access Private
exports.getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({ message: 'Get All Goals', goals });
});

// @desc Post goals
// @route POST /api/goals
// @access Private
exports.postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Text is required');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json({ goal });
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  //Check if goal belongs to user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goal._id, req.body, {
    new: true,
  });

  res.status(200).json({ message: `Put Goal ${req.params.id}`, updatedGoal });
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  //Check if goal belongs to user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  await Goal.findByIdAndDelete(goal._id);

  res.status(200).json({ message: `Deleted Goal ${req.params.id}` });
});

const express = require('express');
const router = express.Router();
const {
  getAllGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require('../controller/goalControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllGoals).post(protect, postGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;

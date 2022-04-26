import { useDispatch } from 'react-redux';
import { getGoals, removeGoal } from '../features/goals/goalSlice';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeGoal(goal._id));
    dispatch(getGoals());
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleDateString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default GoalItem;

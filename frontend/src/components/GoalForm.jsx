import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { create, getGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';

function GoalForm() {
  const [text, setText] = useState('');
  const { isLoading } = useSelector((state) => state.goals);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(create(text));
    dispatch(getGoals());
    setText(' ');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="name"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter goal"
          />
        </div>
        <div className="from-group">
          <button className="btn btn-block">Add Goal</button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;

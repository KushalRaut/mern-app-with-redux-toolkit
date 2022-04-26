const axios = require('axios');

const API_URL = '/api/goals';

//Create Goals
const create = async (userData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, { text: userData }, config);

  return data;
};

//Get User Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);

  return data;
};

//Remove a goal
const removeGoal = async (goalId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(API_URL + `/${goalId}`, config);

  return data;
};

const goalService = {
  create,
  getGoals,
  removeGoal,
};

export default goalService;

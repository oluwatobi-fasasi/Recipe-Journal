import { likesApi } from './Apis.js';

const addLikes = async (id) => {
  const response = await fetch(likesApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: `${id}`,
    }),

  });
  const data = await response.json();
  return data;
};

const likesGet = async () => {
  const response = await fetch(likesApi, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  });
  const data = await response.json();
  return data;
};

export { addLikes, likesGet };
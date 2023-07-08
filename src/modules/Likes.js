import showLikesCount from './ShowLikes.js';

const postLikes = async (id, board) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/likes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  if (response.ok) {
    showLikesCount(id, board);
  }
};

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/likes/', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  return data;
};

export { getLikes, postLikes };
import axios from 'axios';

const postComment = async (id, userInput, userComment) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "item_id": `${id}`,
      "username": `${userInput}`,
      "comment": `${userComment}`
    }),
  });

  const data = await getComment(id);
  return data;
};

const getComment = async (itemId) => {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/comments?item_id=${itemId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch comments');
    }

    return response.data;
  } catch (error) {
    return [];
  }
};

export { getComment, postComment };
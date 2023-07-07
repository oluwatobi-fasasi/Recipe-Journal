import axios from 'axios';

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
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = 'Failed to fetch comments.';
    document.body.appendChild(errorParagraph);
    return [];
  }
};
const postComment = async (id, userInput, userComment) => {
  try {
    await axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/comments', {
      item_id: id,
      username: userInput,
      comment: userComment,
    });

    const data = await getComment(id);
    return data;
  } catch (error) {
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = 'Failed to post comment.';
    document.body.appendChild(errorParagraph);
    return [];
  }
};

export { getComment, postComment };

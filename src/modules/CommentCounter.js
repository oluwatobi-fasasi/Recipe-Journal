import { getComment } from './Comments.js';

const commentCounter = async (id) => {
  const comments = await getComment(id);
  const commentElement = document.getElementById('comment-counter');
  if (commentElement) {
    commentElement.textContent = `(${comments.length})`;
  }
};
export default commentCounter;
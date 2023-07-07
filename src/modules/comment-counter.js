import { commentGet } from './comment-counter.js';

const updateCommentCount = async (id) => {
  const comments = await commentGet(id);
  const commentCountElement = document.querySelector('.comment-counter');
  if (commentCountElement) {
    commentCountElement.textContent = `(${comments.length})`;
  }
};

export default updateCommentCount;

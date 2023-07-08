import { getComment, postComment } from './Comments.js';
import commentCounter from './CommentCounter.js';

const openPopup = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  const mainContainer = document.querySelector('.item-wrapper');

  const popUp = document.createElement('div');
  popUp.classList.add('pop-up');
  const popupContainer = document.createElement('div');
  popupContainer.classList.add('popup-container');
  const comments = await getComment(id);
  let commentsHTML = '';
  if (comments.length > 0) {
    commentsHTML = comments
      .map((item) => `<p>${item.creation_date} - ${item.username}: ${item.comment}</p>`)
      .join('');
  }

  const {
    strMealThumb, strMeal, strArea, strIngredient5, strCategory, strIngredient7,
  } = meals[0];

  popupContainer.innerHTML = `
  <button class="close-btn" id="close-popup-btn"><i class="fa fa-window-close" aria-hidden="true"></i></button>
  <img src="${strMealThumb}" class="popup-image">
  <h2 class="popup-food-name">${strMeal}</h2>
  <div class="popup-item-details-container">
    <p><strong>Category:</strong> ${strCategory}</p>
    <p><strong>Area:</strong> ${strArea}</p>
    <p><strong>Ingredient A:</strong> ${strIngredient5}</p>
    <p><strong>Ingredient B:</strong> ${strIngredient7}</p>
  </div>

  <h3 class="comments-title">Comments <span class="comment-counter" id="comment-counter">(${comments.length})</span></h3>
  <div class="comments-div">${commentsHTML}</div>

  <h3 class="form-title">Add a Comment</h3>
  <form class="form">
    <input class="user-name" type="text" placeholder="Your Name" required>
    <textarea class="your-insight" placeholder="Your Insight" cols="40" rows="5" required></textarea>
    <button type="submit" class="submit-btn">Comment</button>
  </form>
  `;

  const footer = document.getElementById('footer');
  const header = document.querySelector('header');

  footer.classList.add('hidden');
  header.classList.add('hidden');

  popUp.appendChild(popupContainer);
  mainContainer.appendChild(popUp);

  const closeButton = popUp.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
    popUp.remove();
    footer.classList.remove('hidden');
    header.classList.remove('hidden');
  });

  const form = popupContainer.querySelector('.form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = form.querySelector('.user-name');
    const userComment = form.querySelector('.your-insight');
    await postComment(id, userInput.value, userComment.value);
    await commentCounter(id);
    form.reset();
    const updatedComments = await getComment(id);
    const commentsDiv = popupContainer.querySelector('.comments-div');
    commentsDiv.innerHTML = updatedComments
      .map((item) => `<p>${item.creation_date} - ${item.username}: ${item.comment}</p>`)
      .join('');
  });
};

export default openPopup;

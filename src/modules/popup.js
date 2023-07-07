import { getComment, postComment } from './Comments.js';
import commentCounter from './CommentCounter.js';


const footer = document.getElementById('footer');
const header = document.querySelector('header');

const popup = async (id) => {
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
    <button class="close-btn">&times;</button>
    <img src="${strMealThumb}" class="popup-image">
    <h2 class="popup-food-name">${strMeal}</h2>
    <div class="popup-item-details-container">
    <p>Category: ${strCategory}</p>
      <p>Area: ${strArea}</p>
      <p>Ingredient A: ${strIngredient5}</p>
      <p>Ingredient B: ${strIngredient7}</p>
    </div>

    <h3 class="comments-title">Comments<span class='comment-counter' id="comment-counter">(${comments.length})</span></h3>
    <div class="comments-div">
      ${commentsHTML}
    </div>

    <h3 class="form-title">Add a comment</h3>
    <form class="form">
      <input class="user-name" type="text" placeholder="Your Name" required>
      <textarea class="your-insight" placeholder="Your Insight" cols="40" rows="5" required></textarea>
      <button type="submit" class="submit-btn">Comment</button>
    </form>
  `;

  
  footer.classList.toggle('hidden');
  header.classList.toggle('hidden');

  popUp.classList.toggle('visible');
  popUp.appendChild(popupContainer);
  mainContainer.appendChild(popUp);

  const closeBtn = popUp.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    popUp.classList.toggle('visible');
    document.querySelector('footer').classList.toggle('hidden');
    document.querySelector('header').classList.toggle('hidden');
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


   
  

export default popup;
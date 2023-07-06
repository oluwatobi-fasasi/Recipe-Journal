import { recipeApi } from './Apis.js';
import popUpRender from './popup.js';
import { addLikes, likesGet } from './Likes.js';

const fetchMeals = async () => {
  const response = await fetch(recipeApi);
  const { meals } = await response.json();
  return meals;
};

const recipeBoard = document.getElementById('recipe-board');
const header = document.querySelector('header');
const popUpPage = document.getElementById('pop-up');

let fetchMealsData;
let fetchlikesData;
const renderMeals = async () => {
  fetchMealsData = await fetchMeals();
  fetchlikesData = await likesGet();
  fetchMealsData.forEach((meal) => {
    const recipeCard = document.createElement('section');
    recipeCard.classList.add('recipe-card');
    const itemImgDiv = document.createElement('div');
    itemImgDiv.classList.add('item-img');
    const itemImg = document.createElement('img');
    itemImg.src = `${meal.strMealThumb}`;
    const itemName = document.createElement('p');
    itemName.classList.add('item-name');
    itemName.textContent = `${meal.strMeal}`;
    const likeDiv = document.createElement('div');
    likeDiv.classList.add('like-icon-num');
    const likeIcon = document.createElement('p');
    likeIcon.innerHTML = '<span class="material-symbols-outlined">favorite</span>';
    const likeNum = document.createElement('p');
    likeNum.classList.add('num-likes');
    likeNum.textContent = '0 likes';
    fetchlikesData.forEach((item) => {
      if (item.item_id === meal.idMeal) {
        likeNum.textContent = `${item.likes} likes`;
      }
    });
    const commentBtn = document.createElement('button');
    commentBtn.classList.add('comment-btn');
    commentBtn.textContent = 'Comment';
    const reserveBtn = document.createElement('button');
    reserveBtn.classList.add('reserve-btn');
    reserveBtn.textContent = 'Reserve';

    likeDiv.appendChild(likeIcon);
    likeDiv.appendChild(likeNum);

    itemImgDiv.appendChild(itemImg);

    recipeCard.appendChild(itemImgDiv);
    recipeCard.appendChild(itemName);
    recipeCard.appendChild(likeDiv);
    recipeCard.appendChild(commentBtn);
    recipeCard.appendChild(reserveBtn);

    recipeBoard.appendChild(recipeCard);

    commentBtn.addEventListener('click', () => {
      recipeBoard.style.display = 'none';
      header.style.display = 'none';
      popUpPage.style.display = 'block';
      popUpRender(meal.idMeal);
    });

    likeIcon.addEventListener('click', () => {
      addLikes(meal.idMeal);
    });
  });
};

export default renderMeals;
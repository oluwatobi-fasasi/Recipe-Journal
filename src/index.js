import './styles.css';
import getRecipe from './modules/GetRecipes.js';
import popup from './modules/PopUp.js';
import { getLikes, postLikes } from './modules/Likes.js';
import recipeCounter from './modules/RecipeCounter.js';

const itemBoard = document.getElementById('item-board');
const itemNum = document.getElementById('items-num');

let recipeData = [];
const showRecipe = async () => {
    recipeData = await getRecipe();
    const likeData = await getLikes();
    recipeData.map((meal, id) => {
      const itemCard = document.createElement('div');
      itemCard.classList.add('item-list');
      itemCard.setAttribute('data-id', id);
      itemCard.innerHTML = `
        <div class="img-container">
          <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="comment-like">
          <p class="item-name">${meal.strMeal}</p>
          <i class="fa-regular fa-heart" style="color: #fff222;"></i>
        </div>
        <div class="num-likes"></div>
        <div class="item-btn">
          <button class="comment-btn">Comments</button>
          <button class="reservation-btn">Reservation</button>
        </div>
      `;

      const numLikes = itemCard.querySelector('.num-likes');
      let mealLikes = 0;
      const like = likeData.find((like) => like.item_id === id);

      if (like) {
        mealLikes = like.likes;
      }
      numLikes.textContent = `${mealLikes} Likes`;
      const likeIcon = itemCard.querySelector('.fa-heart');
      likeIcon.addEventListener('click', () => {
        postLikes(id, itemCard);
      });

      itemBoard.appendChild(itemCard);
      const commentBtns = itemCard.querySelectorAll('.comment-btn');
      commentBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          popup(meal.idMeal);
        });
      });
    });
};

document.addEventListener('DOMContentLoaded', async () => {
  await showRecipe();
  const numCounter = await recipeCounter();
  itemNum.textContent = `Recipe (${numCounter})`;
});
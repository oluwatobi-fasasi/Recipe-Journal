import { commentsApi } from './Apis.js';

const apiDoc = document.getElementById('api-doc');
const commentGet = async (id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AmOmCpR05yK1s4imyHnc/comments?item_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  });
  const data = await response.json();
  return data;
};

const commentBox = document.getElementById('commentBox');
const h3 = document.createElement('h3');
h3.textContent = 'Comment(5)';
commentBox.appendChild(h3);
const ul = document.createElement('ul');
let commentFetch;
const popUpComment = async (id) => {
  ul.innerHTML = '';
  commentFetch = await commentGet(id);
  for (let i = 0; i < commentFetch.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = `${commentFetch[i].creation_date}  ${commentFetch[i].username}: ${commentFetch[i].comment}`;
    ul.appendChild(li);
    commentBox.appendChild(ul);
  }
};

const popUp = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  const cancelIcon = document.createElement('p');
  cancelIcon.innerHTML = '<span class="material-symbols-outlined cancel-icon">close</span>';
  const popUpdiv = document.createElement('div');
  popUpdiv.classList.add('pop-up-img');
  const popUpImg = document.createElement('img');
  popUpImg.src = `${meals[0].strMealThumb}`;
  popUpdiv.appendChild(popUpImg);
  const itemName = document.createElement('p');
  itemName.classList.add('pop-up-item-name');
  itemName.textContent = `${meals[0].strMeal}`;
  const itemDetails = document.createElement('div');
  itemDetails.classList.add('pop-up-item-details');
  const detail1 = document.createElement('p');
  detail1.textContent = `Category: ${meals[0].strCategory}`;
  const detail2 = document.createElement('p');
  detail2.textContent = `Area: ${meals[0].strArea}`;
  const detail3 = document.createElement('p');
  detail3.textContent = `Ingredient-A: ${meals[0].strIngredient1}`;
  const detail4 = document.createElement('p');
  detail4.textContent = `Ingredient-B: ${meals[0].strIngredient3}`;
  itemDetails.appendChild(detail1);
  itemDetails.appendChild(detail2);
  itemDetails.appendChild(detail3);
  itemDetails.appendChild(detail4);

  apiDoc.appendChild(cancelIcon);
  apiDoc.appendChild(popUpdiv);
  apiDoc.appendChild(itemName);
  apiDoc.appendChild(itemDetails);

  popUpComment(id);
};

const addComment = async (id, input, message) => {
  const response = await fetch(commentsApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: `${id}`,
      username: `${input}`,
      comment: `${message}`,
    }),

  });
  const data = await response.json();

  return data;
};

const form = document.querySelector('form');
const input = document.querySelector('input');
const message = document.querySelector('textarea');

const submitForm = (id) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addComment(id, input.value, message.value);
    commentGet(id);
    popUpComment(id);
    form.reset();
  });
};

export { popUp, submitForm, commentGet };
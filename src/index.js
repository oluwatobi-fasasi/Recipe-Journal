import './style.css';
import logo from './images/logo.png';
import renderMeals from './modules/HomeRender.js';

const logoImg = new Image();
logoImg.src = logo;
document.getElementById('logo').appendChild(logoImg);

renderMeals();
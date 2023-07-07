import { recipeApi } from './Apis.js';

const getRecipe = async () => {
  const response = await fetch(recipeApi);
  const { meals } = await response.json();
  return meals;
};

export default getRecipe;
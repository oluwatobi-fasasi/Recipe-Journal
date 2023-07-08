const getRecipe = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian');
  const { meals } = await response.json();
  return meals;
};

export default getRecipe;
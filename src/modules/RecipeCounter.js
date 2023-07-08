const recipeCounter = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian');
  const data = await response.json();
  const dataLength = data.meals.length;
  return dataLength;
};

export default recipeCounter;
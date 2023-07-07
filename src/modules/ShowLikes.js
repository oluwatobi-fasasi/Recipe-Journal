const showLikesCount = (id, container) => {
    const numLikes = container.querySelector('.num-likes');
    let mealLikes = parseInt(numLikes.textContent, 10);
    mealLikes += 1;
    numLikes.textContent = `${mealLikes} Likes`;
  };
  
  export default showLikesCount;
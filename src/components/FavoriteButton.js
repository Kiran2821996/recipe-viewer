import { useState, useEffect } from 'react';

export default function FavoriteButton({ recipeId, onRemoveFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const checkFavorite = async () => {
      const response = await fetch(`/api/favorites/${recipeId}`);
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    };
    checkFavorite();

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setRecipeDetails(data.meals[0]);
        }
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [recipeId]);

  const toggleFavorite = async () => {
    if (!recipeDetails) {
      console.log('Recipe details not loaded yet, please try again.');
      return;
    }

    const method = isFavorite ? 'DELETE' : 'POST';
    const url = isFavorite ? `/api/favorites/${recipeId}` : '/api/favorites';
    const body = isFavorite ? { recipeId } : {
      recipeId,
      recipeName: recipeDetails.strMeal || 'Unknown Recipe',
      imageUrl: recipeDetails.strMealThumb || '',
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method === 'POST' ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method.toLowerCase()} favorite: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message);
      setIsFavorite(!isFavorite);

      // Trigger re-fetch of favorites list after removal
      if (method === 'DELETE' && onRemoveFavorite) {
        onRemoveFavorite();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-3 py-1 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
    >
      {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
    </button>
  );
}
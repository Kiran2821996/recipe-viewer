import { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      const favoriteRecipes = await Promise.all(
        data.map(async (fav) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.recipeId}`
          );
          const recipeData = await res.json();
          return recipeData.meals[0];
        })
      );
      setFavorites(favoriteRecipes);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch (success or failure)
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black-100 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="min-h-screen bg-black-100 flex items-center justify-center">
        <p className="text-white text-xl">No favt's yet added</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-100">
      <div className="container mx-auto">
        <RecipeList recipes={favorites} onRemoveFavorite={fetchFavorites} />
      </div>
    </div>
  );
}
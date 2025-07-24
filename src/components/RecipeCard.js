import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton';

export default function RecipeCard({ recipe, onRemoveFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">{recipe.strMeal}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {recipe.strInstructions?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <Link className="text-blue-600 hover:underline" href={`/recipe/${recipe.idMeal}`}>
            View Recipe
          </Link>
          <FavoriteButton recipeId={recipe.idMeal} onRemoveFavorite={onRemoveFavorite} />
        </div>
      </div>
    </div>
  );
}
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, onRemoveFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} onRemoveFavorite={onRemoveFavorite} />
      ))}
    </div>
  );
}
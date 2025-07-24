import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import FavoriteButton from "../../components/FavoriteButton";

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => setRecipe(data.meals[0]));
    }
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-6">
        <div className="bg-black rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center w-full gap-4">
            <div className="flex ">
              <button
                onClick={() => router.back()}
                className="text-white px-4 py-2 text-4xl"
              >
                ↩︎
              </button>
              <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
            </div>
            <FavoriteButton recipeId={id} />
          </div>

          <div className="flex gap-4">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              width={500}
              height={500}
              className="w-full max-w-md mx-auto mb-6 rounded"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc pl-6 mb-6">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p className="mb-6">{recipe.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

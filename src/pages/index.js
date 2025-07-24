import { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []));
  }, []);

  return (
    <div className="min-h-screen bg-black-100">
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold text-center my-6">Recipe Viewer</h1> */}
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}
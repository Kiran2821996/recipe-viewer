import { connectToDatabase } from "../../../../utils/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const favorites = db.collection("favorites");

    if (req.method === "GET") {
      const favoriteRecipes = await favorites.find({}).toArray();
      return res.status(200).json(favoriteRecipes);
    }

    if (req.method === "POST") {
      const { recipeId, recipeName, imageUrl } = req.body;
      if (!recipeId || !recipeName || !imageUrl) {
        return res
          .status(400)
          .json({ message: "recipeId, recipeName, and imageUrl are required" });
      }
      await favorites.insertOne({
        recipeId,
        recipeName,
        imageUrl,
        addedAt: new Date(),
      });
      return res.status(201).json({ message: "Added to favorites" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error in favorites API:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

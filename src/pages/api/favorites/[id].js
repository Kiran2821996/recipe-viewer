import { connectToDatabase } from '../../../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const favorites = db.collection('favorites');
  const { id } = req.query;

  if (req.method === 'GET') {
    const favorite = await favorites.findOne({ recipeId: id });
    return res.status(200).json({ isFavorite: !!favorite });
  }

  if (req.method === 'DELETE') {
    await favorites.deleteOne({ recipeId: id });
    return res.status(200).json({ message: 'Removed from favorites' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
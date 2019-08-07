import { RecipeUserPreference } from './types';
import query from '../query';

interface RecipesByPreference {
  [recipeId: string]: RecipeUserPreference;
}

export default async function getRecipesByPreference(userId: string): Promise<RecipesByPreference> {
  const { rows } = await query(`
    SELECT recipe_id, liked, excluded, saved
    FROM auth_user_recipe
    WHERE user_id = $1
  `, [userId]);

  const recipesByPreference: RecipesByPreference = {};

  rows.forEach((row) => {
    const { saved, liked, excluded } = row;
    recipesByPreference[row.recipe_id] = { saved, liked, excluded };
  });

  return recipesByPreference;
}

import query from '../query';
import { RecipeUserPreference } from './types';

export default async function (
  userId: string,
  recipeId: string,
  preference: RecipeUserPreference,
) {
  const { liked, excluded, saved } = preference;

  try {
    const { rows } = await query(`
      INSERT INTO auth_user_recipe (user_id, recipe_id, liked, excluded, saved)
      VALUES ($1, $2, $3, $4, $5) ON CONFLICT(user_id, recipe_id)
      DO UPDATE SET
        liked = COALESCE($3, auth_user_recipe.liked),
        excluded = COALESCE($4, auth_user_recipe.excluded),
        saved = COALESCE($5, auth_user_recipe.saved)
    `,
      [userId, recipeId, liked, excluded, saved]);

    return rows;

  } catch (e) {
    throw new Error('Error saving preference');
  }

}

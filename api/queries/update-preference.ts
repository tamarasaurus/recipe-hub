import query from '../query';

export interface RecipeUserPreference {
  liked?: boolean;
  excluded?: boolean;
  saved?: boolean;
}

export default function (
  userId: string,
  recipeId: string,
  preference: RecipeUserPreference,
) {
  const { liked, excluded, saved } = preference;

  return query(`
      INSERT INTO auth_user_recipe (user_id, recipe_id, liked, excluded, saved)
      VALUES ($1, $2, $3, $4, $5) ON CONFLICT(user_id, recipe_id)
      DO UPDATE SET liked = $3, excluded = $4, saved = $5
    `,
    [
      userId,
      recipeId,
      (liked || false),
      (excluded || false),
      (saved || false),
    ]);
}

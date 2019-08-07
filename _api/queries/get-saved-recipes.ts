import query from '../query';

export default async function (userId: string) {
  const { rows } = await query(`
    SELECT recipe.id,
    recipe.name,
    recipe.duration,
    recipe.ingredients,
    recipe.portions,
    recipe.imageurl,
    recipe.url,
    recipe.created,
    recipe.updated,
    recipe.categories,
    recipe.source,
    json_array_length(recipe.ingredients) as complexity,
    COALESCE(auth_user_recipe.liked, false) as liked,
    COALESCE(auth_user_recipe.excluded, false) as excluded,
    COALESCE(auth_user_recipe.saved, false) as saved
    FROM auth_user_recipe
    RIGHT JOIN recipe on auth_user_recipe.recipe_id = recipe.id
    WHERE auth_user_recipe.user_id = $1
    AND auth_user_recipe.saved = TRUE
  `, [userId]);

  return rows;
}

import query from '../query';

export default async function generateRecipes() {
  const { rows } = await query(`
    SELECT
      id,
      name,
      duration,
      ingredients,
      portions,
      imageurl,
      url,
      created,
      updated,
      categories,
      source,
      json_array_length(recipe.ingredients) as complexity
    FROM recipe
    WHERE name IS NOT NULL
    ORDER BY RANDOM()
    LIMIT 5
  `, []);

  return rows;
}

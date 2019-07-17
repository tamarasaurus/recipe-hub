import getUserId from './queries/get-user-id';
import createUser from './queries/create-user';
import updatePreference, { RecipeUserPreference } from './queries/update-preference';
import upsertRecipe from './queries/upsert-recipe';
import searchRecipes from './queries/search-recipes';
import getSavedRecipes from './queries/get-saved-recipes';

export default class Database {
  getUserId = (authId: string) => getUserId(authId);
  createUser = (authId: string) => createUser(authId);
  insertOrUpdateRecipe = (data: any) => upsertRecipe(data);

  setRecipePreference = async (
    recipeId: string,
    authId: string,
    preference: RecipeUserPreference,
  ) => {
    const userId = await this.getUserId(authId);
    return updatePreference(userId, recipeId, preference);
  }

  searchRecipes = async (searchQuery, authId: string) => {
    const userId = await this.getUserId(authId);
    return searchRecipes(searchQuery, userId);
  }

  async getSavedRecipeIdsForUser(authId: string): Promise<string[]> {
    const userId = await this.getUserId(authId);
    return getSavedRecipes(userId);
  }
}

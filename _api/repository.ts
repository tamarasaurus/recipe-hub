import getUserId from './queries/get-user-id';
import createUser from './queries/create-user';
import updatePreference from './queries/update-preference';
import upsertRecipe from './queries/upsert-recipe';
import searchRecipes from './queries/search-recipes';
import searchRecipesForUser from './queries/search-recipes-for-user';
import generateRecipes from './queries/generate-recipes';
import getSavedRecipes from './queries/get-saved-recipes';
import getRecipesByPreference from './queries/get-recipes-by-preference';
import { RecipeUserPreference } from './queries/types';
import mergeIngredients from './queries/merge-ingredients';

export default class Database {
  public getUserId = (authId: string) => getUserId(authId);
  public createUser = (authId: string) => createUser(authId);
  public insertOrUpdateRecipe = (data: any) => upsertRecipe(data);
  public mergeIngredients = (recipeIds: string[]) => mergeIngredients(recipeIds);

  public setRecipePreference = async (
    recipeId: string,
    authId: string,
    preference: RecipeUserPreference,
  ) => {
    const userId = await this.getUserId(authId);
    return updatePreference(userId, recipeId, preference);
  }

  public searchRecipes = async (searchQuery, authId: string) => {
    const userId = await this.getUserId(authId);

    if (userId) {
      return searchRecipesForUser(searchQuery, userId);
    }

    return await searchRecipes(searchQuery);
  }

  public generateRecipes = async (authId: string) => {
    const userId = await this.getUserId(authId);
    const recipePreferences = await getRecipesByPreference(userId);
    const recipes = await generateRecipes();
    const mappedRecipes = this.mapRecipesToUserPreferences(recipePreferences, recipes);

    return mappedRecipes.filter((recipe: any) => {
      return recipe.excluded === false;
    });
  }

  public async getSavedRecipeIdsForUser(authId: string): Promise<string[]> {
    const userId = await this.getUserId(authId);
    return getSavedRecipes(userId);
  }

  private mapRecipesToUserPreferences(
    recipesByPreference: any,
    recipes: any,
  ) {
    return recipes.map((recipe: any) => {
      const recipePreference = recipesByPreference[recipe.id];
      const recipeDefaults = Object.assign(recipe, {
        liked: false,
        excluded: false,
        saved: false,
      });

      if (!recipePreference) return recipeDefaults;
      const { liked, excluded, saved } = recipePreference;

      return Object.assign(recipe, recipeDefaults, {
        liked, excluded, saved,
      });
    });
  }
}

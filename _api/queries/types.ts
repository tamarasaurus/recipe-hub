export interface RecipeUserPreference {
  liked?: boolean;
  excluded?: boolean;
  saved?: boolean;
}

export interface SearchQuery {
  keywords?: string;
  offset?: number;
  source?: string;
  sort?: string;
  order?: string;
  liked?: number;
}
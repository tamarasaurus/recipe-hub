const API_URL = process.env.REACT_APP_API_URL + '/api' || ''

export enum SortBy {
  CREATED_DESC = 'sort=created&order=desc',
  CREATED_ASC = 'sort=created&order=asc',
  COMPLEXITY_DESC = 'sort=complexity&order=desc',
  COMPLEXITY_ASC = 'sort=complexity&order=asc',
}

const fetchApi = async (query: RequestInfo, options?: RequestInit) => {
  const res = await fetch(API_URL + query, options)
  return await res.json()
}

const get = fetchApi
const post = (query: RequestInfo, options: RequestInit = {}) =>
  fetchApi(query, {
    ...options,
    method: 'POST',
  })

export const getRecipes = ({
  keywords = '',
  offset = 0,
  sortBy = SortBy.CREATED_DESC,
  liked = 0,
} = {}) =>
  get(`/recipes?keywords=${keywords}&offset=${offset}&${sortBy}&liked=${liked}`)
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id: string) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id: string) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id: string) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id: string) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id: string) => post(`/recipes/${id}/exclude`)
export const generateRecipes = () => get(`/recipes/generate`)
export const getMergedRecipes = (ids: string) =>
  get(`/recipes/merge?ids=${ids}`)

export const getUser = () => get(`/user`)
export const loginUrl = process.env.REACT_APP_API_URL + '/login'
export const logoutUrl = process.env.REACT_APP_API_URL + '/logout'

export const OFFSET = 24

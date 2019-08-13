const API_URL = '/api'

export const SORT_BY = {
  CREATED_DESC: 'sort=created&order=desc',
  CREATED_ASC: 'sort=created&order=asc',
  COMPLEXITY_DESC: 'sort=complexity&order=desc',
  COMPLEXITY_ASC: 'sort=complexity&order=asc',
}

const fetchApi = async (query, options) => {
  const res = await fetch(API_URL + query, options)
  return await res.json()
}

const get = fetchApi
const post = (query, options) =>
  fetchApi(query, {
    ...options,
    method: 'POST',
  })

export const getRecipes = ({
  keywords = '',
  offset = 0,
  sortBy = SORT_BY.CREATED_DESC,
  liked = 0,
} = {}) =>
  get(`/recipes?keywords=${keywords}&offset=${offset}&${sortBy}&liked=${liked}`)
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id) => post(`/recipes/${id}/exclude`)
export const generateRecipes = () => get(`/recipes/generate`)
export const getMergedRecipes = (ids) => get(`/recipes/merge?ids=${ids}`)

export const getUser = (id) => get(`/user`)
export const loginUrl = process.env.REACT_APP_API_URL + '/login'
export const logoutUrl = process.env.REACT_APP_API_URL + '/logout'

export const OFFSET = 24

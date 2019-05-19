const API_URL = 'http://192.168.1.44:8000'

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

export const getRecipes = () => get('/recipes')
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id) => post(`/recipes/${id}/exclude`)

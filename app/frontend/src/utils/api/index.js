const API_URL = 'http://localhost:8000/api'
// const API_URL = 'https://recipe-hub-app.herokuapp.com/api'

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

export const getRecipes = (keyword = '', offset = 0) =>
  get(`/recipes?keywords=${keyword}&offset=${offset}`)
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id) => post(`/recipes/${id}/exclude`)

export const OFFSET = 24

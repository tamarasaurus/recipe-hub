const API_URL = process.env.REACT_APP_API_URL + '/api' || ''

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

export const getRecipes = ({ keywords = '', offset = 0 } = {}) =>
  get(`/recipes?keywords=${keywords}&offset=${offset}`)
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id) => post(`/recipes/${id}/exclude`)
export const generateRecipes = () => get(`/recipes/generate`)

export const getUser = (id) => get(`/user`)
export const loginUrl = process.env.REACT_APP_API_URL + '/login'
export const logoutUrl = process.env.REACT_APP_API_URL + '/logout'

export const OFFSET = 24

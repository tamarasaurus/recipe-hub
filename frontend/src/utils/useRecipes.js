import { useState, useEffect } from 'react'

import * as api from 'utils/api'

export default (defaultRecipes, { filters, sortBy, offset, setOffset }) => {
  const [recipes, setRecipes] = useState(defaultRecipes)
  const [hasLoadedRecipes, setHasLoadedRecipes] = useState(false)
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false)

  const [canLoadMoreRecipes, setCanLoadMoreRecipes] = useState(true)
  const checkIfCanLoadMoreRecipes = (items) => {
    setCanLoadMoreRecipes(items.length === api.OFFSET)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingRecipes(true)
      const newRecipes = await api.getRecipes({
        keywords: filters.query,
        sortBy,
        liked: filters.liked,
      })
      setRecipes(newRecipes)
      setIsLoadingRecipes(false)
      setHasLoadedRecipes(true)

      setOffset(0)
      checkIfCanLoadMoreRecipes(newRecipes)
    }

    const timeout = setTimeout(fetchData, 300)
    return () => clearTimeout(timeout)
  }, [filters.liked, filters.query, sortBy, setOffset])

  const loadMoreRecipes = async () => {
    const newOffset = offset + api.OFFSET
    setIsLoadingRecipes(true)
    const newRecipes = await api.getRecipes({
      keywords: filters.query,
      offset: newOffset,
      sortBy,
      liked: filters.liked,
    })
    setRecipes(recipes.concat(newRecipes))
    setIsLoadingRecipes(false)

    setOffset(newOffset)
    checkIfCanLoadMoreRecipes(newRecipes)
  }

  const toggleLikeRecipe = (recipe) => {
    if (recipe.liked) {
      api.unlikeRecipe(recipe.id)
    } else {
      api.likeRecipe(recipe.id)
    }

    setRecipes(
      recipes.map((r) => {
        if (r.id !== recipe.id) return r
        return {
          ...recipe,
          liked: !recipe.liked,
        }
      }),
    )
  }

  const excludeRecipe = (recipe) => {
    if (
      window.confirm(
        'Do you really want to exclude this recipe? It will be hidden for ever ever',
      )
    ) {
      api.excludeRecipe(recipe.id)
      setRecipes(recipes.filter((r) => r.id !== recipe.id))
    }
  }

  return {
    recipes,
    setRecipes,
    hasLoadedRecipes,
    isLoadingRecipes,
    canLoadMoreRecipes,
    loadMoreRecipes,
    toggleLikeRecipe,
    excludeRecipe,
  }
}

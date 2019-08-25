import { useState, useEffect } from 'react'

import * as api from 'utils/api'

export default (defaultSavedRecipes, { setRecipes }) => {
  const [savedRecipes, setSavedRecipes] = useState(defaultSavedRecipes)
  const [hasLoadedSavecRecipes, setHasLoadedSavecRecipes] = useState(false)
  const [isLoadingSavecRecipes, setIsLoadingSavecRecipes] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingSavecRecipes(true)
      setSavedRecipes(await api.getSavedRecipes())
      setIsLoadingSavecRecipes(false)
      setHasLoadedSavecRecipes(true)
    }

    fetchData()
  }, [])

  const toggleSaveRecipe = (recipe) => {
    const isRecipeSaved = savedRecipes.some((r) => r.id === recipe.id)
    if (isRecipeSaved) {
      api.unsaveRecipe(recipe.id)
      setSavedRecipes(savedRecipes.filter(({ id }) => id !== recipe.id))
    } else {
      api.saveRecipe(recipe.id)
      setSavedRecipes([
        ...savedRecipes,
        {
          ...recipe,
          saved: true,
        },
      ])
    }

    setRecipes((recipes) => {
      return recipes.map((r) => {
        if (r.id !== recipe.id) return r
        return {
          ...recipe,
          saved: !isRecipeSaved,
        }
      })
    })
  }

  const generateSavedRecipes = async () => {
    const savedRecipes = await api.generateRecipes()
    setSavedRecipes(savedRecipes)
    setRecipes((recipes) =>
      recipes.map((recipe) => ({
        ...recipe,
        saved: savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id),
      })),
    )
  }

  return {
    savedRecipes,
    setSavedRecipes,
    hasLoadedSavecRecipes,
    isLoadingSavecRecipes,
    toggleSaveRecipe,
    generateSavedRecipes,
  }
}

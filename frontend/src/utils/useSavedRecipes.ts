import { useState, useEffect } from 'react'

import * as api from 'utils/api'
import { Recipe } from 'utils/useRecipes'

interface Options {
  setRecipes: (setState: (prevState: Recipe[]) => Recipe[]) => void
}

export default (defaultSavedRecipes: Recipe[], { setRecipes }: Options) => {
  const [savedRecipes, setSavedRecipes] = useState(defaultSavedRecipes)
  const [hasLoadedSavedRecipes, setHasLoadedSavedRecipes] = useState(false)
  const [isLoadingSavedRecipes, setIsLoadingSavedRecipes] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingSavedRecipes(true)
      setSavedRecipes(await api.getSavedRecipes())
      setIsLoadingSavedRecipes(false)
      setHasLoadedSavedRecipes(true)
    }

    fetchData()
  }, [])

  const toggleSaveRecipe = (recipe: Recipe) => {
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

    setRecipes((recipes: Recipe[]) => {
      return recipes.map((r: Recipe) => {
        if (r.id !== recipe.id) return r
        return Object.assign({
          recipe,
          saved: !isRecipeSaved,
        })
      })
    })
  }

  const generateSavedRecipes = async () => {
    const savedRecipes = await api.generateRecipes()
    setSavedRecipes(savedRecipes)
    setRecipes((recipes: Recipe[]) => {
      return recipes.map((recipe: Recipe) => ({
        ...recipe,
        saved: savedRecipes.some(
          (savedRecipe: Recipe) => savedRecipe.id === recipe.id,
        ),
      }))
    })
  }

  return {
    savedRecipes,
    setSavedRecipes,
    hasLoadedSavedRecipes,
    isLoadingSavedRecipes,
    toggleSaveRecipe,
    generateSavedRecipes,
  }
}

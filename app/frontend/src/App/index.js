import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'

import Filters from './Filters'
import RecipeList from './RecipeList'
import SavedRecipes from './SavedRecipes'

import * as api from 'utils/api'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'Filters Filters'
    'RecipeList SavedRecipes';
  height: 100%;
  background: ${({ theme }) => theme.colors.grays.s};
`

const App = () => {
  const [filters, setFilters] = useState({
    query: '',
  })
  const setFilter = (label, value) => {
    const newFilters = {
      ...filters,
      [label]: value,
    }
    setFilters(newFilters)
    setOffset(0)
  }

  const [canLoadMore, setCanLoadMore] = useState(true)
  const checkIfCanLoadMore = (items) => {
    setCanLoadMore(items.length === api.OFFSET)
  }

  const [recipes, setRecipes] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasLoadedRecipes, setHasLoadedRecipes] = useState(false)
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingRecipes(true)
      const newRecipes = await api.getRecipes(filters.query)
      setRecipes(newRecipes)
      setIsLoadingRecipes(false)
      setHasLoadedRecipes(true)

      setOffset(0)
      checkIfCanLoadMore(newRecipes)
    }

    const timeout = setTimeout(fetchData, 300)
    return () => clearTimeout(timeout)
  }, [filters.query])

  const loadMore = async () => {
    const newOffset = offset + api.OFFSET
    setIsLoadingRecipes(true)
    const newRecipes = await api.getRecipes(filters.query, newOffset)
    setRecipes(recipes.concat(newRecipes))
    setIsLoadingRecipes(false)

    setOffset(newOffset)
    checkIfCanLoadMore(newRecipes)
  }

  const [savedRecipes, setSavedRecipes] = useState([])
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
      setSavedRecipes([...savedRecipes, recipe])
    }

    setRecipes(
      recipes.map((r) => {
        if (r.id !== recipe.id) return r
        return {
          ...recipe,
          saved: !isRecipeSaved,
        }
      }),
    )
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

  return (
    <Layout>
      <Filters filters={filters} setFilter={setFilter} />
      <RecipeList
        hasLoaded={hasLoadedRecipes}
        isLoading={isLoadingRecipes}
        recipes={recipes}
        toggleSaveRecipe={toggleSaveRecipe}
        toggleLikeRecipe={toggleLikeRecipe}
        excludeRecipe={excludeRecipe}
        canLoadMore={canLoadMore}
        loadMore={loadMore}
      />
      <SavedRecipes
        hasLoaded={hasLoadedSavecRecipes}
        isLoading={isLoadingSavecRecipes}
        savedRecipes={savedRecipes}
        removeSavedRecipe={toggleSaveRecipe}
      />
    </Layout>
  )
}

export default App

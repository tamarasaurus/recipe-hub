import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'

import Filters from '../Filters'
import RecipeList from '../RecipeList'
import ShortList from '../ShortList'

import data from '../data.json'

const Layout = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: ${({ theme }) => theme.colors.gray[100]};
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

    debouncedUpdateRecipes(newFilters)
  }

  const [recipes, setRecipes] = useState(data)
  const updateRecipes = (filters) => {
    // @TODO API call
    setRecipes(
      data.filter((recipe) => new RegExp(filters.query, 'i').test(recipe.name)),
    )
  }
  const debouncedUpdateRecipes = useCallback(debounce(updateRecipes, 300), [])

  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem('savedRecipes')) || [],
  )
  const toggleRecipe = (recipe) => {
    const recipes = savedRecipes.includes(recipe)
      ? savedRecipes.filter((r) => r !== recipe)
      : [...savedRecipes, recipe]

    setSavedRecipes(recipes)
    localStorage.setItem('savedRecipes', JSON.stringify(recipes))
  }

  return (
    <Layout>
      <Filters filters={filters} setFilter={setFilter} />
      <RecipeList
        recipes={recipes}
        savedRecipes={savedRecipes}
        toggleRecipe={toggleRecipe}
      />
      <ShortList savedRecipes={savedRecipes} toggleRecipe={toggleRecipe} />
    </Layout>
  )
}

export default App

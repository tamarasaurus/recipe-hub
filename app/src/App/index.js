import React, { useState } from 'react'
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
  background: #f3f3f3;
`

const App = () => {
  const [filters, setFilters] = useState({})
  const setFilter = (label, value) => {
    const newFilters = {
      ...filters,
      [label]: value,
    }
    setFilters(newFilters)

    updateRecipes(newFilters)
  }

  const [recipes, setRecipes] = useState(data)
  const updateRecipes = debounce((filters) => {
    console.log(filters)
    setRecipes(
      data.filter((recipe) => {
        return Object.entries(filters).every(([label, value]) => {
          return new RegExp(value, 'i').test(recipe[label])
        })
      }),
    )
  }, 3000)

  const [savedRecipes, setSavedRecipes] = useState([])
  const toggleRecipe = (recipe) => {
    setSavedRecipes(
      savedRecipes.includes(recipe)
        ? savedRecipes.filter((r) => r !== recipe)
        : [...savedRecipes, recipe],
    )
  }

  return (
    <Layout>
      <Filters filters={filters} setFilter={setFilter} />
      <RecipeList
        recipes={recipes}
        savedRecipes={savedRecipes}
        toggleRecipe={toggleRecipe}
      />
      <ShortList savedRecipes={savedRecipes} />
    </Layout>
  )
}

export default App

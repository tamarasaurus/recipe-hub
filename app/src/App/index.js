import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'

import Filters from '../Filters'
import RecipeList from '../RecipeList'
import ShortList from '../ShortList'

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  background: ${({ theme }) => theme.colors.gray[100]};
`

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    query: '',
  })
  const setFilter = (label, value) => {
    const newFilters = {
      ...filters,
      [label]: value,
    }
    setFilters(newFilters)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const res = await fetch('http://192.168.1.44:8000/recipes')
      const data = await res.json()

      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [filters.query])

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
        isLoading={isLoading}
        recipes={data}
        savedRecipes={savedRecipes}
        toggleRecipe={toggleRecipe}
      />
      <ShortList savedRecipes={savedRecipes} toggleRecipe={toggleRecipe} />
    </Layout>
  )
}

export default App

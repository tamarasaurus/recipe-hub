import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Recipe from '../../App/RecipeList/Recipe/index'
import { ThemeProvider } from 'styled-components/macro'

afterEach(cleanup)

const providers = ({ children }) => {
  const theme = {
    colors: {},
    px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
    radius: '4px',
    imageHeight: 230,
    lineHeight: 1.2,
    breakpoints: {},
    mediaQueries: {
      m: `@media (min-width: 960px)`,
      l: `@media (min-width: 1024px)`,
    },
    borders: {
      s: `1px solid red`,
      m: `2px solid red`,
      l: `4px solid red`,
    },
    transition: '200ms',
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const renderWithTheme = (ui, options) => {
  return render(ui, { wrapper: providers, ...options })
}

it('renders a recipe card', () => {
  const recipe = {
    id: 1,
    name: 'Weeknight chicken',
    duration: 120,
    ingredients: [],
    portions: 2,
    imageurl: 'http://image.com',
    url: 'http://recipe.com',
    created: new Date(),
    updated: new Date(),
    categories: 'chicken, pork, vegetables',
  }

  const toggleSaveRecipe = () => {}
  const toggleLikeRecipe = () => {}
  const excludeRecipe = () => {}

  const { queryByText } = renderWithTheme(
    <Recipe
      key={recipe.id}
      recipe={recipe}
      toggleSaveRecipe={toggleSaveRecipe}
      toggleLikeRecipe={toggleLikeRecipe}
      excludeRecipe={excludeRecipe}
    />,
  )

  expect(queryByText(/Weeknight chicken/)).toBeTruthy()
})

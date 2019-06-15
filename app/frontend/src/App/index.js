import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import styled, {
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components/macro'

import Header from './Header'
import RecipeList from './RecipeList'
import SavedRecipes from './SavedRecipes'

import * as api from 'utils/api'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    line-height: ${({ theme }) => theme.lineHeight};
  }

  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.base3};
    text-shadow: none;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: sans-serif;
    color: ${({ theme }) => theme.colors.base0};
  }

  button {
    appearance: none;
    border: none;
    background: none;
    text-align: left;
  }

  button,
  [role='button'] {
    cursor: pointer;
  }

  input {
    background: ${({ theme }) => theme.colors.base3};
  }

  :focus {
    outline: ${({ theme }) => theme.colors.accent} auto 5px;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'Header Header'
    'RecipeList SavedRecipes';
  height: 100%;
  background: ${({ theme }) => theme.colors.base2};
`

export const AppContext = createContext()

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || 'light',
  )
  const toggleTheme = useCallback(() => {
    setCurrentTheme((theme) => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }, [])
  const theme = useCallback(
    (mainTheme) => {
      const currentColors =
        currentTheme === 'light' ? mainTheme.lightColors : mainTheme.darkColors

      return {
        ...mainTheme,
        colors: {
          ...mainTheme.accentColors,
          ...currentColors,
        },
        borders: {
          s: `1px solid ${currentColors.base0}`,
          m: `2px solid ${currentColors.base0}`,
          l: `4px solid ${currentColors.base0}`,
        },
      }
    },
    [currentTheme],
  )

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
  const toggleSaveRecipe = useCallback(
    (recipe) => {
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

      setRecipes((recipes) =>
        recipes.map((r) => {
          if (r.id !== recipe.id) return r
          return {
            ...recipe,
            saved: !isRecipeSaved,
          }
        }),
      )
    },
    [savedRecipes],
  )

  const toggleLikeRecipe = useCallback(
    (recipe) => {
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
    },
    [recipes],
  )

  const excludeRecipe = useCallback(
    (recipe) => {
      if (
        window.confirm(
          'Do you really want to exclude this recipe? It will be hidden for ever ever',
        )
      ) {
        api.excludeRecipe(recipe.id)
        setRecipes(recipes.filter((r) => r.id !== recipe.id))
      }
    },
    [recipes],
  )

  const contextValue = useMemo(
    () => ({
      toggleSaveRecipe,
      toggleLikeRecipe,
      excludeRecipe,
    }),
    [toggleSaveRecipe, toggleLikeRecipe, excludeRecipe],
  )

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Layout>
            <Header
              filters={filters}
              setFilter={setFilter}
              hasLightTheme={currentTheme === 'light'}
              toggleTheme={toggleTheme}
            />
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
        </>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App

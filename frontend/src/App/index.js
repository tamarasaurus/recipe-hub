import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import styled from 'styled-components/macro'

import Header from './Header'
import RecipeList from './RecipeList'
import SavedRecipes from './SavedRecipes'

import * as api from 'utils/api'

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
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const user = await api.getUser()
      setUser(user)
    }

    fetchData()
  }, [])

  const [filters, setFilterss] = useState({
    query: '',
  })
  const setFilters = (label, value) => {
    const newFilters = {
      ...filters,
      [label]: value,
    }
    setFilterss(newFilters)
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
  const [sortBy, setSortBy] = useState(api.SORT_BY.CREATED_DESC)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingRecipes(true)
      const newRecipes = await api.getRecipes({
        keywords: filters.query,
        sortBy,
      })
      setRecipes(newRecipes)
      setIsLoadingRecipes(false)
      setHasLoadedRecipes(true)

      setOffset(0)
      checkIfCanLoadMore(newRecipes)
    }

    const timeout = setTimeout(fetchData, 300)
    return () => clearTimeout(timeout)
  }, [filters.query, sortBy])

  const loadMore = async () => {
    const newOffset = offset + api.OFFSET
    setIsLoadingRecipes(true)
    const newRecipes = await api.getRecipes({
      keywords: filters.query,
      offset: newOffset,
      sortBy,
    })
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

  const generateRecipes = useCallback(async () => {
    const savedRecipes = await api.generateRecipes()
    setSavedRecipes(savedRecipes)
    setRecipes((recipes) =>
      recipes.map((recipe) => ({
        ...recipe,
        saved: savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id),
      })),
    )
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
      <Layout>
        <Header filters={filters} setFilters={setFilters} user={user} />
        <RecipeList
          hasLoaded={hasLoadedRecipes}
          isLoading={isLoadingRecipes}
          recipes={recipes}
          toggleSaveRecipe={toggleSaveRecipe}
          toggleLikeRecipe={toggleLikeRecipe}
          excludeRecipe={excludeRecipe}
          canLoadMore={canLoadMore}
          loadMore={loadMore}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
        />
        <SavedRecipes
          hasLoaded={hasLoadedSavecRecipes}
          isLoading={isLoadingSavecRecipes}
          savedRecipes={savedRecipes}
          removeSavedRecipe={toggleSaveRecipe}
          generateRecipes={generateRecipes}
        />
      </Layout>
    </AppContext.Provider>
  )
}

export default App

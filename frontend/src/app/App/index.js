import React, { createContext, useState } from 'react'
import styled from 'styled-components/macro'

import Header from 'app//Header'
import RecipeList from 'app/RecipeList'
import SavedRecipeList from 'app/SavedRecipeList'

import useFilters from 'utils/useFilters'
import useRecipes from 'utils/useRecipes'
import useSavedRecipes from 'utils/useSavedRecipes'
import * as api from 'utils/api'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'Header Header'
    'RecipeList SavedRecipeList';
  height: 100%;
  background: ${({ theme }) => theme.colors.base2};
`

export const AppContext = createContext()

const App = () => {
  const [offset, setOffset] = useState(0)
  const [sortBy, setSortBy] = useState(api.SORT_BY.CREATED_DESC)

  const { filters, addFilter } = useFilters(
    {
      query: '',
      liked: 0,
    },
    { setOffset },
  )

  const {
    recipes,
    setRecipes,
    hasLoadedRecipes,
    isLoadingRecipes,
    canLoadMoreRecipes,
    loadMoreRecipes,
    toggleLikeRecipe,
    excludeRecipe,
  } = useRecipes([], {
    filters,
    sortBy,
    offset,
    setOffset,
  })

  const {
    savedRecipes,
    hasLoadedSavecRecipes,
    isLoadingSavecRecipes,
    toggleSaveRecipe,
    generateSavedRecipes,
  } = useSavedRecipes([], { setRecipes })

  const contextValue = {
    toggleSaveRecipe,
    toggleLikeRecipe,
    excludeRecipe,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Layout>
        <Header filters={filters} addFilter={addFilter} />
        <RecipeList
          hasLoaded={hasLoadedRecipes}
          isLoading={isLoadingRecipes}
          recipes={recipes}
          toggleSaveRecipe={toggleSaveRecipe}
          toggleLikeRecipe={toggleLikeRecipe}
          excludeRecipe={excludeRecipe}
          canLoadMoreRecipes={canLoadMoreRecipes}
          loadMore={loadMoreRecipes}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
        />
        <SavedRecipeList
          hasLoaded={hasLoadedSavecRecipes}
          isLoading={isLoadingSavecRecipes}
          savedRecipes={savedRecipes}
          removeSavedRecipe={toggleSaveRecipe}
          generateSavedRecipes={generateSavedRecipes}
        />
      </Layout>
    </AppContext.Provider>
  )
}

export default App

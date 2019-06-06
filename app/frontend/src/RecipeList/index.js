import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import Button from '../Button'
import Recipe from './Recipe'

import { OFFSET } from '../api'

const Container = styled.div`
  grid-area: RecipeList;
  position: relative;
  padding: ${({ theme }) => theme.px(3, 4)};
  overflow-y: auto;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${({ theme }) => theme.px(2)};
  max-width: ${({ theme }) => theme.breakpoints.l};
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.m} {
    grid-template-columns: 50% 50%;
    grid-template-columns: 50% 50%;
  }
  ${({ theme }) => theme.mediaQueries.l} {
    grid-template-columns: 33% 33% 33%;
  }
`

const LoadMore = styled(Button)`
  display: block;
  margin: ${({ theme }) => theme.px(3)} auto 0;
`

const Placeholders = () =>
  Array.from(new Array(OFFSET), (_, i) => <Recipe key={i} isPlaceholder />)

const RecipeList = ({
  hasLoaded,
  isLoading,
  recipes,
  toggleSaveRecipe,
  toggleLikeRecipe,
  excludeRecipe,
  canLoadMore,
  loadMore,
}) => {
  return (
    <Container>
      {recipes.length ? (
        <>
          <List>
            {recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                toggleSaveRecipe={toggleSaveRecipe}
                toggleLikeRecipe={toggleLikeRecipe}
                excludeRecipe={excludeRecipe}
              />
            ))}
            {isLoading && <Placeholders />}
          </List>
          {canLoadMore && <LoadMore onClick={loadMore}>Load more</LoadMore>}
        </>
      ) : !hasLoaded || isLoading ? (
        <List>
          <Placeholders />
        </List>
      ) : (
        <div>No recipes found</div>
      )}
    </Container>
  )
}

RecipeList.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  toggleSaveRecipe: PropTypes.func.isRequired,
  toggleLikeRecipe: PropTypes.func.isRequired,
  excludeRecipe: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
}

export default RecipeList

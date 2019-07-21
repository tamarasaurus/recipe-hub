import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styled from 'styled-components/macro'

import Button from 'components/Button'
import Header from './Header'
import Recipe from './Recipe'

import { OFFSET } from 'utils/api'

const Container = styled.section`
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
  sortBy,
  onChangeSortBy,
}) => {
  // Can't use ref because a ref mutates and can't be used as a useEffect dependency
  const [list, setList] = useState()
  const loadMoreRef = useRef()

  useEffect(() => {
    if (!list) return

    const handleScroll = throttle(() => {
      const { top, bottom } = loadMoreRef.current.getBoundingClientRect()
      if (top >= 0 && bottom <= window.innerHeight) {
        loadMore()
      }
    }, 200)
    list.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      handleScroll.cancel()
      list.removeEventListener('scroll', handleScroll)
    }
  }, [list, loadMore])

  return (
    <Container ref={(el) => setList(el)}>
      {recipes.length ? (
        <>
          <Header sortBy={sortBy} onChange={onChangeSortBy} />
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
          {canLoadMore && (
            <LoadMore ref={loadMoreRef} onClick={isLoading ? null : loadMore}>
              {isLoading ? 'Loading...' : 'Load more'}
            </LoadMore>
          )}
        </>
      ) : !hasLoaded || isLoading ? (
        <>
          <Header sortBy={sortBy} onChange={onChangeSortBy} />
          <List>
            <Placeholders />
          </List>
        </>
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
  sortBy: Header.propTypes.sortBy,
  onChangeSortBy: Header.propTypes.onChange,
}

export default RecipeList

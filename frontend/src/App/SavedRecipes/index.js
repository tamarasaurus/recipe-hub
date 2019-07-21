import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import Button from 'components/Button'
import SavedRecipe from './SavedRecipe'
import ShoppingList from './ShoppingList'

const Container = styled.section`
  position: fixed;
  bottom: 0;
  right: 0;
  background: none;
  grid-area: SavedRecipes;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(2)};
  ${({ theme }) => theme.mediaQueries.m} {
    position: static;
    width: 300px;
    background: ${({ theme }) => theme.colors.base3};
  }
`

const Title = styled.h1`
  display: none;
  ${({ theme }) => theme.mediaQueries.m} {
    display: block;
    margin: ${({ theme }) => theme.px(0, 0, 2)};
    border: solid ${({ theme }) => theme.colors.accent};
    border-width: ${({ theme }) => theme.px(0, 0, 0.5)};
    font-size: ${({ theme }) => theme.px(3)};
  }
`

const List = styled.ul`
  display: none;
  ${({ theme }) => theme.mediaQueries.m} {
    display: block;
    flex-grow: 1;
  }
`

const ShowShoppingList = {
  s: styled.button`
    width: ${({ theme }) => theme.px(7)};
    height: ${({ theme }) => theme.px(7)};
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    text-align: center;
    box-shadow: ${({ theme }) =>
      theme.px(0, 0.5, 1) +
      ' rgba(0, 0, 0, 0.16), ' +
      theme.px(0, 0.5, 1) +
      ' rgba(0, 0, 0, 0.22)'};
    ${({ theme }) => theme.mediaQueries.m} {
      display: none;
    }
  `,
  m: styled(Button)`
    display: none;
    ${({ theme }) => theme.mediaQueries.m} {
      display: block;
      border: ${({ theme }) => theme.borders.m};
      text-align: center;
    }
  `,
}

const Loader = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.m} {
    display: block;
  }
`

const NoRecipes = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.m} {
    display: block;
  }
`

const GenerateRecipesButton = styled(Button)`
  margin-top: ${({ theme }) => theme.px(2)};
`

const ShoppingListIcon = () => (
  <span role="img" aria-label="shopping list">
    📝
  </span>
)

const SavedRecipes = ({
  hasLoaded,
  isLoading,
  savedRecipes,
  removeSavedRecipe,
  generateRecipes,
}) => {
  const [isShowingShoppingList, toggleShowShoppingList] = useState(false)
  const openShoppingList = () => toggleShowShoppingList(true)
  const closeShoppingList = () => toggleShowShoppingList(false)

  return (
    <Container>
      {savedRecipes.length ? (
        <>
          <Title>Your recipes</Title>
          <List>
            {savedRecipes.map((recipe) => (
              <SavedRecipe
                key={recipe.id}
                recipe={recipe}
                onRemove={() => removeSavedRecipe(recipe)}
              />
            ))}
          </List>
          <ShowShoppingList.s onClick={openShoppingList}>
            <ShoppingListIcon />
          </ShowShoppingList.s>
          <ShowShoppingList.m onClick={openShoppingList}>
            <ShoppingListIcon /> Shopping list
          </ShowShoppingList.m>
          {isShowingShoppingList && (
            <ShoppingList recipes={savedRecipes} onClose={closeShoppingList} />
          )}
        </>
      ) : !hasLoaded || isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <NoRecipes>
          Start adding recipes to your shopping list by clicking on them
          <GenerateRecipesButton onClick={generateRecipes}>
            Add 5 random recipes to your list
          </GenerateRecipesButton>
        </NoRecipes>
      )}
    </Container>
  )
}

SavedRecipes.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  savedRecipes: PropTypes.array.isRequired,
  removeSavedRecipe: PropTypes.func.isRequired,
  generateRecipes: PropTypes.func.isRequired,
}

export default SavedRecipes

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ShoppingList from '../ShoppingList'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(2)};
  background: ${({ theme }) => theme.colors.white};
  border-top: ${({ theme }) => theme.border.s};
`

const List = styled.div()

const Item = styled.button`
  padding: ${({ theme }) => theme.px(0.5, 1)};
  margin-right: ${({ theme }) => theme.px(1)};
  border: ${({ theme }) => theme.border.s};
  border-radius: ${({ theme }) => theme.radius};
  &::after {
    content: '×';
    margin-left: ${({ theme }) => theme.px(0.5)};
  }
`

const ShowShoppingList = styled.button`
  padding: ${({ theme }) => theme.px(0.5, 1)};
  border: ${({ theme }) => theme.border.m};
  border-radius: ${({ theme }) => theme.radius};
`

const ShortList = ({ savedRecipes, toggleRecipe }) => {
  const [isShowingShoppingList, toggleShowShoppingList] = useState(false)
  const openShoppingList = () => toggleShowShoppingList(true)
  const closeShoppingList = () => toggleShowShoppingList(false)

  return (
    <Container>
      {savedRecipes.length ? (
        <>
          <List>
            {savedRecipes.map((recipe) => (
              <Item key={recipe.id} onClick={() => toggleRecipe(recipe)}>
                {recipe.name}
              </Item>
            ))}
          </List>
          <ShowShoppingList onClick={openShoppingList}>
            Show shopping list
          </ShowShoppingList>
          {isShowingShoppingList ? (
            <ShoppingList
              recipes={savedRecipes}
              closeShoppingList={closeShoppingList}
            />
          ) : null}
        </>
      ) : (
        <div>No saved recipes</div>
      )}
    </Container>
  )
}

ShortList.propTypes = {
  savedRecipes: PropTypes.array.isRequired,
  toggleRecipe: PropTypes.func.isRequired,
}

export default ShortList

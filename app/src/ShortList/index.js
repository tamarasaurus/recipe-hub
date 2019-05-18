import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Button from '../Button'
import ShoppingList from './ShoppingList'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: none;
  grid-area: ShortList;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(2)};
  ${({ theme }) => theme.mediaQueries.m} {
    position: static;
    width: 300px;
    background: ${({ theme }) => theme.colors.white};
  }
`

const List = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.m} {
    display: block;
  }
`

const Item = styled(Button)`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.px(0.5, 2, 0.5, 1)};
  margin-bottom: ${({ theme }) => theme.px(1)};
  &::after {
    content: '×';
    position: absolute;
    top: ${({ theme }) => theme.px(0.5)};
    right: ${({ theme }) => theme.px(0.5)};
  }
`

const ShowShoppingList = {
  s: styled(Button)`
    width: ${({ theme }) => theme.px(6)};
    height: ${({ theme }) => theme.px(6)};
    border: ${({ theme }) => theme.border.l};
    border-color: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.m} {
      display: none;
    }
  `,
  m: styled(Button)`
    display: none;
    ${({ theme }) => theme.mediaQueries.m} {
      display: block;
      border: ${({ theme }) => theme.border.l};
      text-align: center;
    }
  `,
}

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
          <ShowShoppingList.s onClick={openShoppingList}>📝</ShowShoppingList.s>
          <ShowShoppingList.m onClick={openShoppingList}>
            📝 Shopping list
          </ShowShoppingList.m>
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

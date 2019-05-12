import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import uniq from 'lodash/uniq'
import styled from '@emotion/styled'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  width: 800px;
  max-height: 75vh;
  padding: ${({ theme }) => theme.px(6, 0, 0, 6)};
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`

const CopyList = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.px(3)};
`

const Recipe = styled.div`
  padding-bottom: ${({ theme }) => theme.px(2)};
`

const RecipeName = styled.div`
  font-weight: bold;
`

const Ingredient = styled.div`
  padding: ${({ theme }) => theme.px(1)};
  border-bottom: ${({ theme }) => theme.border};
`

const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const ShoppingList = ({ recipes, closeShoppingList }) => {
  const elRef = useRef(document.createElement('div'))
  useEffect(() => {
    const el = elRef.current
    document.body.appendChild(el)

    const closeOnEscape = (e) => {
      if (e.keyCode === 27) closeShoppingList()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      el.remove()
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [closeShoppingList])

  const copyIngredients = () => {
    const ingredients = uniq(
      recipes
        .map((recipe) =>
          recipe.ingredients.map((ingredient) =>
            Object.values(ingredient).join(': '),
          ),
        )
        .flat(),
    ).join('\n')
    copyToClipboard(ingredients)
  }

  return createPortal(
    <Container>
      <Backdrop onClick={closeShoppingList} />
      <Content>
        <CopyList onClick={copyIngredients}>
          Copy ingredients to clipboard
        </CopyList>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <RecipeName>{recipe.name}</RecipeName>
            {recipe.ingredients.map((ingredient, i) => (
              <Ingredient key={i}>
                {ingredient.label} {ingredient.quantity}
              </Ingredient>
            ))}
          </Recipe>
        ))}
      </Content>
    </Container>,
    elRef.current,
  )
}

ShoppingList.propTypes = {
  recipes: PropTypes.array.isRequired,
  closeShoppingList: PropTypes.func.isRequired,
}

export default ShoppingList

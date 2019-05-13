import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Backdrop = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const Content = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  width: 800px;
  max-height: 75vh;
  padding: ${({ theme }) => theme.px(8, 0, 0, 8)};
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`

const CopyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.px(2)};
`

const CopyRecipes = styled(CopyButton)`
  left: 0;
`

const CopyIngredients = styled(CopyButton)`
  right: 0;
`

const Recipe = styled.div`
  padding-bottom: ${({ theme }) => theme.px(4)};
`

const RecipeName = styled.div`
  font-weight: bold;
`

const Ingredient = styled.div`
  padding: ${({ theme }) => theme.px(1)};
  border-bottom: ${({ theme }) => theme.border.m};
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
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (e) => {
      if (e.keyCode === 27) closeShoppingList()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      el.remove()
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [closeShoppingList])

  const copyRecipes = () => {
    copyToClipboard(
      recipes.map((recipe) => `# ${recipe.name}\n${recipe.url}`).join('\n\n'),
    )
  }

  const copyIngredients = () => {
    copyToClipboard(
      recipes
        .map((recipe) =>
          recipe.ingredients.map((ingredient) =>
            Object.values(ingredient).join(': '),
          ),
        )
        .flat()
        .sort()
        .join('\n'),
    )
  }

  const backdropStyle = useSpring({ opacity: 1, from: { opacity: 0 } })
  const contentStyle = useSpring({
    transform: 'translate(-50%, 0)',
    from: { transform: 'translate(-50%, 100%)' },
  })

  return createPortal(
    <Container>
      <Backdrop style={backdropStyle} onClick={closeShoppingList} />
      <Content style={contentStyle}>
        <CopyRecipes onClick={copyRecipes}>
          Copy recipes to clipboard
        </CopyRecipes>
        <CopyIngredients onClick={copyIngredients}>
          Copy ingredients to clipboard
        </CopyIngredients>
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

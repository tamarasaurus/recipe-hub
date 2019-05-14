import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'

import Button from '../../Button'

const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const formatIngredient = (ingredient) => {
  return ingredient.quantity
    ? `${ingredient.label}: ${ingredient.quantity}`
    : ingredient.label
}

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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 75vh;
  padding: ${({ theme }) => theme.px(2)};
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.m} {
    width: 75vw;
    max-width: 600px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.px(4)};

  > :first-child {
    margin-bottom: ${({ theme }) => theme.px(1)};
  }

  ${({ theme }) => theme.mediaQueries.m} {
    flex-direction: row;

    > :first-child {
      margin-bottom: 0;
    }
  }
`

const Recipe = styled.div`
  margin-bottom: ${({ theme }) => theme.px(4)};
`

const RecipeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: baseline;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.px(1)};
`

const CopyRecipe = styled(Button)`
  flex-shrink: 0;
`

const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(1)};
  border-bottom: ${({ theme }) => theme.border.s};
`

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
    const str = recipes
      .map((recipe) => `# ${recipe.name}\n${recipe.url}`)
      .join('\n\n')

    copyToClipboard(str)
  }

  const copyIngredients = () => {
    const str = recipes
      .map((recipe) => recipe.ingredients.map(formatIngredient))
      .flat()
      .sort()
      .join('\n')

    copyToClipboard(str)
  }

  const copyRecipe = (recipe) => {
    const str = [
      `# ${recipe.name}`,
      `${recipe.url}\n`,
      recipe.ingredients.map(formatIngredient).join('\n'),
    ].join('\n')

    copyToClipboard(str)
  }

  const backdropStyle = useSpring({ opacity: 1, from: { opacity: 0 } })
  const contentStyle = useSpring({
    to: { transform: 'translate(-50%, 0)' },
    from: { transform: 'translate(-50%, 100%)' },
  })

  return createPortal(
    <Container>
      <Backdrop style={backdropStyle} onClick={closeShoppingList} />
      <Content style={contentStyle}>
        <Header>
          <Button onClick={copyRecipes}>Copy all recipes to clipboard</Button>
          <Button onClick={copyIngredients}>
            Copy all ingredients to clipboard
          </Button>
        </Header>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <RecipeName>
              {recipe.name}
              <CopyRecipe onClick={() => copyRecipe(recipe)}>
                Copy recipe
              </CopyRecipe>
            </RecipeName>
            {recipe.ingredients.map((ingredient, i) => (
              <Ingredient key={i}>
                <span>{ingredient.label}</span>
                {ingredient.quantity && <span>{ingredient.quantity}</span>}
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

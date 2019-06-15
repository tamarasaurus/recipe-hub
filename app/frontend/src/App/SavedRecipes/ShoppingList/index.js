import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components/macro'

import Panel from 'components/Panel'
import Button from 'components/Button'

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

const contentCss = css`
  ${({ theme }) => theme.mediaQueries.m} {
    max-width: 600px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.px(4)};

  > :first-of-type {
    margin-bottom: ${({ theme }) => theme.px(1)};
  }

  ${({ theme }) => theme.mediaQueries.m} {
    flex-direction: row;

    > :first-of-type {
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
  border-bottom: ${({ theme }) => theme.borders.s};
`

const ShoppingList = ({ recipes, onClose }) => {
  const elRef = useRef(document.createElement('div'))

  useEffect(() => {
    const el = elRef.current
    document.body.appendChild(el)
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (e) => {
      if (e.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      el.remove()
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

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

  return (
    <Panel contentCss={contentCss} onClose={onClose}>
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
    </Panel>
  )
}

ShoppingList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ShoppingList

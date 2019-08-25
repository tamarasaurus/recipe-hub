import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import { AppContext } from 'app/App'
import Panel from 'components/Panel'
import Button from 'components/Button'

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.px(2)};
`

// @TODO Prevent iframe re-render
const Iframe = memo(styled.iframe`
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.base1};
`)

const RecipePanel = ({ recipe, onClose }) => {
  const { toggleSaveRecipe, toggleLikeRecipe, excludeRecipe } = useContext(
    AppContext,
  )

  return (
    <Panel onClose={onClose}>
      <Buttons>
        <Button onClick={() => toggleSaveRecipe(recipe)}>
          {recipe.saved ? 'Remove' : 'Add'} recipe{' '}
          {recipe.saved ? 'from' : 'to'} your shopping list
        </Button>
        <Button onClick={() => toggleLikeRecipe(recipe)}>
          {recipe.liked ? 'Unlike' : 'Like'} recipe
        </Button>
        <Button onClick={() => excludeRecipe(recipe)}>Exclude recipe</Button>
      </Buttons>
      <Iframe src={recipe.url} />
    </Panel>
  )
}

RecipePanel.propTypes = {
  recipe: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RecipePanel

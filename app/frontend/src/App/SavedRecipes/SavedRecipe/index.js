import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import RecipePanel from 'App/RecipePanel'

const Container = styled.li`
  position: relative;
  display: block;
  width: 100%;
  padding-right: ${({ theme }) => theme.px(3)};
  margin-bottom: ${({ theme }) => theme.px(1)};
`

const SeeRecipe = styled.button``

const RemoveRecipe = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.px(3)};
  height: ${({ theme }) => theme.px(3)};
  color: ${({ theme }) => theme.colors.warning};
`

const SavedRecipe = ({ recipe, onRemove }) => {
  const [isShowingRecipePanel, setIsShowingRecipePanel] = useState(false)
  const openRecipePanel = useCallback(() => setIsShowingRecipePanel(true), [])
  const closeRecipePanel = useCallback(() => setIsShowingRecipePanel(false), [])

  return (
    <Container>
      <SeeRecipe onClick={openRecipePanel}>{recipe.name}</SeeRecipe>
      <RemoveRecipe role="button" title="Remove recipe" onClick={onRemove}>
        ×
      </RemoveRecipe>
      {isShowingRecipePanel && (
        <RecipePanel recipe={recipe} onClose={closeRecipePanel} />
      )}
    </Container>
  )
}

SavedRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default SavedRecipe

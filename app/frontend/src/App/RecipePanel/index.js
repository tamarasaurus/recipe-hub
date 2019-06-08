import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import { AppContext } from 'App'
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
  background: ${({ theme }) => theme.colors.grays.m};
`)

const RecipePanel = memo(({ href, onClose }) => {
  const { toggleSaveRecipe, toggleLikeRecipe, excludeRecipe } = useContext(
    AppContext,
  )

  return (
    <Panel onClose={onClose}>
      <Buttons>
        <Button onClick={toggleSaveRecipe}>
          Add recipe to your shopping list
        </Button>
        <Button onClick={toggleLikeRecipe}>Like recipe</Button>
        <Button onClick={excludeRecipe}>Exclude recipe</Button>
      </Buttons>
      <Iframe src={href} />
    </Panel>
  )
})

RecipePanel.propTypes = {
  href: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RecipePanel

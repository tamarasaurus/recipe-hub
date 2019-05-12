import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #ccc;

  > * {
    padding-right: 8px;
  }
`

const ShortList = ({ savedRecipes }) => {
  return (
    <Container>
      {savedRecipes.length ? (
        savedRecipes.map((recipe) => <div key={recipe.id}>{recipe.name}</div>)
      ) : (
        <div>No saved recipes</div>
      )}
    </Container>
  )
}

ShortList.propTypes = {
  savedRecipes: PropTypes.array,
}

export default ShortList

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import { SORT_BY } from 'utils/api'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.px(2)};
`

const Title = styled.h2``

const Header = ({ sortBy, onChange }) => {
  return (
    <Container>
      <Title>Recipes</Title>
      <label>
        Sort by:{' '}
        <select value={sortBy} onChange={(e) => onChange(e.target.value)}>
          <option value={SORT_BY.CREATED_DESC}>Newest first</option>
          <option value={SORT_BY.CREATED_ASC}>Oldest first</option>
          <option value={SORT_BY.COMPLEXITY_DESC}>Most complex</option>
          <option value={SORT_BY.COMPLEXITY_ASC}>Least complex</option>
        </select>
      </label>
    </Container>
  )
}

Header.propTypes = {
  sortBy: PropTypes.oneOf(Object.values(SORT_BY)).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Header

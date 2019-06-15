import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import FoodEmoji from './FoodEmoji'

const Form = styled.div`
  grid-area: Filters;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.px(3)};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ theme }) => theme.borders.m};
  font-size: ${({ theme }) => theme.px(3)};
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.px(1, 2)};
  margin-left: ${({ theme }) => theme.px(2)};
  border: ${({ theme }) => theme.borders.m};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) =>
    theme.px(0.5, 0.5, 0) + ' ' + theme.colors.grays.l};
  transition: ${({ theme }) => theme.transition};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) =>
      theme.px(0.5, 0.5, 0) + ' ' + theme.colors.accent};
  }
`

const Filters = ({ filters, setFilter }) => {
  const onChange = (e) => {
    setFilter(e.target.name, e.target.value)
  }

  return (
    <Form>
      <FoodEmoji />
      <Input
        name="query"
        placeholder="Search for a recipe name, ingredient or category"
        value={filters.query}
        onChange={onChange}
      />
    </Form>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
  setFilter: PropTypes.func,
}

export default Filters

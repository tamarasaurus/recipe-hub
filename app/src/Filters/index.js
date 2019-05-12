import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import FoodEmoji from './FoodEmoji'

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.px(3)};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ theme }) => theme.border};
  font-size: ${({ theme }) => theme.px(3)};
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.px(1, 2)};
  margin-left: ${({ theme }) => theme.px(2)};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
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
        autoFocus
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

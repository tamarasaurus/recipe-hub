import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Form = styled.form`
  display: flex;
  justify-content: space-around;
  padding: 32px;
  background: #fff;
`

const Filters = ({ filters, setFilter }) => {
  const onChange = (e) => {
    setFilter(e.target.name, e.target.value)
  }

  return (
    <Form>
      <label>
        Name
        <input name="name" value={filters.name || ''} onChange={onChange} />
      </label>
      <label>
        Duration
        <input
          name="duration"
          value={filters.duration || ''}
          onChange={onChange}
        />
      </label>
      <label>
        Ingredients
        <input
          name="ingredients"
          value={filters.ingredients || ''}
          onChange={onChange}
        />
      </label>
      <label>
        Categories
        <input
          name="categories"
          value={filters.categories || ''}
          onChange={onChange}
        />
      </label>
      <label>
        Calories
        <input
          name="calories"
          value={filters.calories || ''}
          onChange={onChange}
        />
      </label>
    </Form>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
  setFilter: PropTypes.func,
}

export default Filters

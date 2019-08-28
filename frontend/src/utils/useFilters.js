import { useState } from 'react'

export default (defaultFilters, { setOffset }) => {
  const [filters, setFilter] = useState({
    query: '',
    liked: 0,
  })
  const addFilter = (label, value) => {
    setFilter((filters) => ({
      ...filters,
      [label]: value,
    }))
    setOffset(0)
  }

  return {
    filters,
    addFilter,
  }
}

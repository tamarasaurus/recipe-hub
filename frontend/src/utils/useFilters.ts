import { useState } from 'react'

export interface Filters {
  query?: string
  liked?: number
}

interface Options {
  setOffset: (offset: number) => void
}

export default (defaultFilters: Filters, { setOffset }: Options) => {
  const [filters, setFilter] = useState<Filters>(defaultFilters)
  const addFilter = (label: keyof Filters, value: any) => {
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

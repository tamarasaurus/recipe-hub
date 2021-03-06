import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components/macro'
import { animated, useTransition } from 'react-spring'

const Container = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.px(1, 2)};
  border: ${({ theme }) => theme.borders.m};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) =>
    theme.px(0.5, 0.5, 0) + ' ' + theme.colors.base0};
  font-size: ${({ theme }) => theme.px(3)};
  transition: ${({ theme }) => theme.transition};
  &:focus {
    outline: none;
  }
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      border-radius: ${({ theme }) => theme.radius}
        ${({ theme }) => theme.radius} 0 0;
      box-shadow: ${({ theme }) =>
        theme.px(0.5, 0.5, 0) + ' ' + theme.colors.accent};
    `}
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Dropdown = styled(animated.div)`
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.px(1, 2)};
  border: ${({ theme }) => theme.borders.m};
  border-color: ${({ theme }) => theme.colors.accent};
  border-radius: 0 0 ${({ theme }) => theme.radius}
    ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) =>
    theme.px(0.5, 0.5, 0) + ' ' + theme.colors.accent};
  background: ${({ theme }) => theme.colors.base3};
`

const Label = styled.label`
  margin-top: ${({ theme }) => theme.px(2)};
  display: inline-block;
`

const Filters = ({ className, filters, addFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const openDropdown = useCallback(() => setIsDropdownOpen(true), [])
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), [])

  const onChange = (e) => {
    addFilter(e.target.name, e.target.value)
  }

  const onChecked = (e) => {
    addFilter(e.target.name, e.target.checked ? 1 : 0)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      closeDropdown()
      e.target.blur()
    }
  }

  const dropdownTransition = useTransition(isDropdownOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <Container className={className}>
      <Input
        name="query"
        placeholder="Search for a recipe name, ingredient or category"
        value={filters.query}
        autoComplete="off"
        isDropdownOpen={isDropdownOpen}
        onChange={onChange}
        onFocus={openDropdown}
        onKeyDown={onKeyDown}
      />
      {isDropdownOpen && (
        <>
          <Backdrop onClick={closeDropdown} />
          {dropdownTransition.map(
            ({ item, key, props }) =>
              item && (
                <Dropdown key={key} style={props}>
                  <h3> Filter by </h3>
                  <Label>
                    <input
                      name="liked"
                      checked={filters.liked}
                      onChange={onChecked}
                      type="checkbox"
                    />{' '}
                    Liked
                  </Label>
                </Dropdown>
              ),
          )}
        </>
      )}
    </Container>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
}

export default Filters

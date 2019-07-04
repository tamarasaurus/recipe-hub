import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import FoodEmoji from './FoodEmoji'
import Filters from './Filters'

import * as api from 'utils/api'

const Container = styled.div`
  position: relative;
  z-index: 1;
  grid-area: Header;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.px(3)};
  background: ${({ theme }) => theme.colors.base3};
  border-bottom: ${({ theme }) => theme.borders.m};
`

const StyledFilters = styled(Filters)`
  flex-grow: 1;
  margin: 0 ${({ theme }) => theme.px(2)};
`

const Link = styled.a``

const Header = ({ filters, setFilters, user }) => {
  return (
    <Container>
      <FoodEmoji />
      <StyledFilters filters={filters} setFilters={setFilters} />
      {user &&
        (user.isLoggedIn ? (
          <Link href={api.logoutUrl}>Logout</Link>
        ) : (
          <Link href={api.loginUrl}>Login</Link>
        ))}
    </Container>
  )
}

Header.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
}

export default Header

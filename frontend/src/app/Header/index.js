import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import Filters from 'app/Filters'

import useUser from 'utils/useUser'
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

const Header = ({ filters, addFilter }) => {
  const user = useUser()

  return (
    <Container>
      <StyledFilters filters={filters} addFilter={addFilter} />
      {user &&
        (user.isLoggedIn ? (
          <Link href={api.logoutUrl}>Logout</Link>
        ) : (
          <Link href={api.loginUrl}>Login with Google</Link>
        ))}
    </Container>
  )
}

Header.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
}

export default Header

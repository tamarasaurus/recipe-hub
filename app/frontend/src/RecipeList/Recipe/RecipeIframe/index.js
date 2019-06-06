import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'

import Portal from '../../../Portal'

const Iframe = styled.iframe`
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.grays.m};
`

const RecipeIframe = ({ href, onClose }) => {
  return (
    <Portal onClose={onClose}>
      <Iframe src={href} />
    </Portal>
  )
}

RecipeIframe.propTypes = {
  href: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RecipeIframe

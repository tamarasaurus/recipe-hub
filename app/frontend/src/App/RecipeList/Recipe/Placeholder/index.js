import React from 'react'
import styled from '@emotion/styled/macro'

const Image = styled.div`
  height: ${({ theme }) => theme.imageHeight}px;
  background: ${({ theme }) => theme.colors.grays.m};
`

const Text = styled.div`
  width: 66%;
  height: ${({ theme }) =>
    Math.ceil(parseInt(theme.px(2), 10) * theme.lineHeight)}px;
  margin: ${({ theme }) => theme.px(2)};
  background: ${({ theme }) => theme.colors.grays.m};
`

const Placeholder = ({
  hasLoaded,
  isLoading,
  recipes,
  toggleSaveRecipe,
  toggleLikeRecipe,
  excludeRecipe,
  loadMore,
}) => {
  return (
    <>
      <Image />
      <Text />
    </>
  )
}

export default Placeholder

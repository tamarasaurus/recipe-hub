import styled from '@emotion/styled'

const Button = styled.button`
  padding: ${({ theme }) => theme.px(0.5, 1)};
  border: ${({ theme }) => theme.border.m};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.white};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background: ${({ theme }) => theme.colors.gray.s};
  }
`

export default Button

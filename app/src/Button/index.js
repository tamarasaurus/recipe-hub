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
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) =>
      theme.px(0, 0, 0, 0.25) + ' ' + theme.colors.accent};
  }
`

export default Button

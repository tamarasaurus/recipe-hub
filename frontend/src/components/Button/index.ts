import styled from 'styled-components/macro'

const Button = styled.button`
  padding: ${({ theme }) => theme.px(1)};
  border: ${({ theme }) => theme.borders.s};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.base3};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background: ${({ theme }) => theme.colors.base2};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 ${({ theme }) => theme.px(0.25)}
      ${({ theme }) => theme.colors.accent};
  }
`

export default Button

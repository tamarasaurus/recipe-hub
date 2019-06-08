/** @jsx jsx */
import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled/macro'
import { jsx } from '@emotion/core'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Backdrop = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const Content = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85vh;
  padding: ${({ theme }) => theme.px(2)};
  border-top-left-radius: ${({ theme }) => theme.radius};
  border-top-right-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.m} {
    width: 75vw;
  }
`

const Panel = ({ contentCss, children, onClose }) => {
  const elRef = useRef(document.createElement('div'))

  useEffect(() => {
    const el = elRef.current
    document.body.appendChild(el)
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (e) => {
      if (e.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      el.remove()
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  const backdropStyle = useSpring({ opacity: 1, from: { opacity: 0 } })
  const contentStyle = useSpring({
    to: { transform: 'translate(-50%, 0)' },
    from: { transform: 'translate(-50%, 100%)' },
  })

  return createPortal(
    <Container>
      <Backdrop style={backdropStyle} onClick={onClose} />
      <Content style={contentStyle} css={contentCss}>
        {children}
      </Content>
    </Container>,
    elRef.current,
  )
}

Panel.propTypes = {
  contentCss: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Panel
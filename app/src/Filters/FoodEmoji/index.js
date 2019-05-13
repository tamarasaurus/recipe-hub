import React, { useRef, useState } from 'react'
import sample from 'lodash/sample'
import styled from '@emotion/styled'

const foodEmojis = [
  '🍇',
  '🍈',
  '🍉',
  '🍊',
  '🍋',
  '🍌',
  '🍍',
  '🥭',
  '🍎',
  '🍏',
  '🍐',
  '🍑',
  '🍒',
  '🍓',
  '🥝',
  '🍅',
  '🥥',
  '🥑',
  '🍆',
  '🥔',
  '🥕',
  '🌽',
  '🌶',
  '🥒',
  '🥬',
  '🥦',
  '🍄',
  '🥜',
  '🌰',
  '🍞',
  '🥐',
  '🥖',
  '🥨',
  '🥯',
  '🥞',
  '🧀',
  '🍖',
  '🍗',
  '🥩',
  '🥓',
  '🍔',
  '🍟',
  '🍕',
  '🌭',
  '🥪',
  '🌮',
  '🌯',
  '🥙',
  '🍳',
  '🥘',
  '🍲',
  '🥣',
  '🥗',
  '🍿',
  '🧂',
  '🥫',
  '🍱',
  '🍘',
  '🍙',
  '🍚',
  '🍛',
  '🍜',
  '🍝',
  '🍠',
  '🍢',
  '🍣',
  '🍤',
  '🍥',
  '🥮',
  '🍡',
  '🥟',
  '🥠',
  '🥡',
  '🍦',
  '🍧',
  '🍨',
  '🍩',
  '🍪',
  '🎂',
  '🍰',
  '🧁',
  '🥧',
  '🍫',
  '🍬',
  '🍭',
  '🍮',
]

const Emoji = styled.span`
  width: ${({ theme }) => theme.px(5)};
  cursor: cell;
`

const getRandomEmoji = () => sample(foodEmojis)

const FoodEmoji = () => {
  const interval = useRef()
  const [emoji, setEmoji] = useState(getRandomEmoji())

  const onMouseEnter = () => {
    interval.current = setInterval(() => setEmoji(getRandomEmoji()), 50)
  }
  const onMouseLeave = () => {
    clearInterval(interval.current)
  }

  return (
    <Emoji onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {emoji}
    </Emoji>
  )
}

export default FoodEmoji

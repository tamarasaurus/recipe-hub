import React, { useState } from 'react'
import sample from 'lodash/sample'
import styled from '@emotion/styled/macro'

const foodEmojis = [
  '🍇',
  '🍈',
  '🍉',
  '🍊',
  '🍋',
  '🍌',
  '🍍',
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
  '🥦',
  '🍄',
  '🥜',
  '🌰',
  '🍞',
  '🥐',
  '🥖',
  '🥨',
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
  const [emoji, setEmoji] = useState(getRandomEmoji())

  return <Emoji onMouseMove={() => setEmoji(getRandomEmoji())}>{emoji}</Emoji>
}

export default FoodEmoji

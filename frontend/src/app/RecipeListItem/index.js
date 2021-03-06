import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import RecipePanel from 'app/RecipePanel'
import RecipeListItemPlaceholder from 'app/RecipeListItemPlaceholder'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isPlaceholder }) =>
    isPlaceholder ? 'normal' : 'space-between'};
  min-height: 340px;
  border: ${({ theme }) => theme.borders.s};
  border-color: ${({ isSaved, theme }) =>
    isSaved ? theme.colors.accent : theme.colors.base1};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ isSaved, theme }) =>
    !isSaved ? null : theme.px(0, 0, 0, 0.75) + ' ' + theme.colors.accent};
  background: ${({ theme }) => theme.colors.base3};
  transition: ${({ theme }) => theme.transition};
  overflow: hidden;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) =>
      theme.px(0, 0, 0, 0.5) + ' ' + theme.colors.accent};
  }
`

const Image = styled.div`
  height: ${({ theme }) => theme.imageHeight}px;
  background: url("${({ url }) => url}") center
    ${({ theme }) => theme.colors.base1};
  background-size: cover;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-grow: 1;
  padding: ${({ theme }) => theme.px(2)};
`

const Action = styled.button`
  display: flex;
  justify-content: center;
  width: ${({ theme }) => theme.px(4)};
  height: ${({ theme }) => theme.px(4)};
`

const LikeRecipe = styled(Action)`
  filter: grayscale(${(props) => (props.isLiked ? 0 : 1)});
  &:before {
    content: '⭐';
  }
`

const ExcludeRecipe = styled(Action)`
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: ${({ theme }) => theme.radius};
  background: rgba(255, 255, 255, 0.75);
  opacity: 0;
  pointer-events: none;
  transition: ${({ theme }) => theme.transition};
  &:before {
    content: '×';
    font-size: ${({ theme }) => theme.px(4)};
    line-height: 1;
    color: ${({ theme }) => theme.colors.warning};
  }
  ${Container}:hover & {
    opacity: 1;
    pointer-events: all;
  }
`

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-left only because we want the link to be big
  padding-left: ${({ theme }) => theme.px(1)};
  border-top: ${({ theme }) => theme.borders.s};
  border-color: ${({ theme }) => theme.colors.base1};
  font-size: 14px;
`

const RecipeLink = styled.a`
  padding: ${({ theme }) => theme.px(1)};
`

const RecipeListItem = ({
  recipe,
  isPlaceholder,
  toggleSaveRecipe,
  toggleLikeRecipe,
  excludeRecipe,
}) => {
  const [isShowingRecipePanel, setIsShowingRecipePanel] = useState(false)
  const openRecipePanel = useCallback(() => setIsShowingRecipePanel(true), [])
  const closeRecipePanel = useCallback(() => setIsShowingRecipePanel(false), [])

  const onClickRecipeLink = (e) => {
    // @TODO handle cmd on mac and ctrl everywhere else
    // @TODO always return on mobile
    if (e.ctrlKey || e.metaKey) return

    e.stopPropagation()
    e.preventDefault()
    openRecipePanel()
  }

  return (
    <Container
      role="button"
      tabIndex="0"
      isPlaceholder={isPlaceholder}
      isSaved={!recipe ? null : recipe.saved}
      onClick={!recipe ? null : () => toggleSaveRecipe(recipe)}
    >
      {isPlaceholder ? (
        <RecipeListItemPlaceholder />
      ) : (
        <>
          <ExcludeRecipe
            title="Exclude recipe"
            tabIndex="-1"
            onClick={(e) => {
              e.stopPropagation()
              excludeRecipe(recipe)
            }}
          />
          <Image url={recipe.imageurl} />
          <Header data-test="recipe-name">
            {recipe.name}
            <LikeRecipe
              title={recipe.liked ? 'Unlink recipe' : 'Like recipe'}
              isLiked={recipe.liked}
              onClick={(e) => {
                e.stopPropagation()
                toggleLikeRecipe(recipe)
              }}
            />
          </Header>
          <Infos>
            <span>
              {recipe.duration > 0 && <>🕒 {recipe.duration / 60} Min</>}
            </span>
            <RecipeLink
              onClick={onClickRecipeLink}
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              See recipe
            </RecipeLink>
          </Infos>

          {isShowingRecipePanel && (
            <RecipePanel recipe={recipe} onClose={closeRecipePanel} />
          )}
        </>
      )}
    </Container>
  )
}

RecipeListItem.propTypes = {
  recipe: PropTypes.object,
  isPlaceholder: PropTypes.bool,
  toggleSaveRecipe: PropTypes.func,
  toggleLikeRecipe: PropTypes.func,
  excludeRecipe: PropTypes.func,
}

export default RecipeListItem

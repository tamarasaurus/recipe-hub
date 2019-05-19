import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Button from '../Button'

const Container = styled.div`
  grid-area: RecipeList;
  position: relative;
  padding: ${({ theme }) => theme.px(3, 4)};
  overflow-y: auto;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${({ theme }) => theme.px(2)};
  max-width: ${({ theme }) => theme.breakpoints.l};
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.m} {
    grid-template-columns: 50% 50%;
    grid-template-columns: 50% 50%;
  }
  ${({ theme }) => theme.mediaQueries.l} {
    grid-template-columns: 33% 33% 33%;
  }
`

const Item = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ isSaved, theme }) =>
    !isSaved ? null : theme.px(0, 0, 0, 0.75) + ' ' + theme.colors.accent};
  transition: ${({ theme }) => theme.transition};
  overflow: hidden;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.px(0, 0, 0, 0.5) + ' ' + theme.colors.accent};

    /* It's the Exclude button but using it directly breaks the syntax highlighting of the file */
    > :first-child {
      opacity: 1;
      pointer-events: all;
    }
  }
`

const Image = styled.div`
  height: 230px;
  background: url(${({ url }) => url}) center;
  background-size: cover;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(2)};
`

const Actions = styled.div`
  display: flex;
`

const Action = styled.button`
  display: flex;
  justify-content: center;
  width: ${({ theme }) => theme.px(4)};
  height: ${({ theme }) => theme.px(4)};
`

const Like = styled(Action)`
  filter: grayscale(${(props) => (props.isLiked ? 0 : 1)});
`

const Exclude = styled(Action)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: ${({ theme }) => theme.transition};
`

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(1)};
  border-top: ${({ theme }) => theme.border.m};
  border-color: ${({ theme }) => theme.colors.gray.m};
  font-size: 14px;
`

const RecipeLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  transition: ${({ theme }) => theme.transition};
`

const LoadMore = styled(Button)()

const RecipeList = ({
  hasLoaded,
  isLoading,
  recipes,
  toggleSaveRecipe,
  toggleLikeRecipe,
  excludeRecipe,
}) => {
  return (
    <Container>
      {recipes.length ? (
        <List>
          {recipes.map((recipe) => (
            <Item
              key={recipe.id}
              role="button"
              tabIndex="0"
              isSaved={recipe.saved}
              onClick={() => toggleSaveRecipe(recipe)}
            >
              <Exclude
                title="Exclude recipe"
                tabIndex="-1"
                onClick={(e) => {
                  e.stopPropagation()
                  excludeRecipe(recipe)
                }}
              >
                ❌
              </Exclude>
              <Image url={recipe.imageurl} />
              <Header>
                {recipe.name}
                <Like
                  title={recipe.liked ? 'Unlink recipe' : 'Like recipe'}
                  isLiked={recipe.liked}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLikeRecipe(recipe)
                  }}
                >
                  ⭐
                </Like>
              </Header>
              <Infos>
                <span>
                  {recipe.duration > 0 && <>🕒 {recipe.duration / 60} Min</>}
                </span>
                <RecipeLink
                  onClick={(e) => e.stopPropagation()}
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See recipe
                </RecipeLink>
              </Infos>
            </Item>
          ))}
          <LoadMore>Load more</LoadMore>
        </List>
      ) : !hasLoaded || isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>no results</div>
      )}
    </Container>
  )
}

RecipeList.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  toggleSaveRecipe: PropTypes.func.isRequired,
  toggleLikeRecipe: PropTypes.func.isRequired,
  excludeRecipe: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
}

export default RecipeList

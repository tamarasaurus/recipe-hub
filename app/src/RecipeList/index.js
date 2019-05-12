import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  padding: ${({ theme }) => theme.px(3)};
  overflow-y: auto;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: ${({ theme }) => theme.px(2)};
  max-width: 1200px;
  margin: 0 auto;
`

const Item = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ isSaved, theme }) => theme.colors.gray[isSaved ? 700 : 400]};
  border-bottom-left-radius: ${({ theme }) => theme.radius};
  border-bottom-right-radius: ${({ theme }) => theme.radius};
`

const Image = styled.div`
  height: 230px;
  background: url(${({ url }) => url}) center;
  background-size: cover;
`

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(2)};
`

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.px(1)};
  border-top: ${({ theme }) => theme.border};
`

const Star = styled.span`
  filter: grayscale(${(props) => (props.isSaved ? 0 : 1)});
`

const RecipeList = ({ isLoading, recipes, savedRecipes, toggleRecipe }) => {
  return (
    <Container>
      {recipes.length ? (
        <List>
          {recipes.map((recipe) => {
            const isRecipeSaved = savedRecipes.includes(recipe)

            return (
              <Item
                key={recipe.id}
                isSaved={isRecipeSaved}
                onClick={() => toggleRecipe(recipe)}
              >
                <Image url={recipe.imageurl} />
                <Name>
                  {recipe.name}
                  <Star isSaved={isRecipeSaved}>⭐</Star>
                </Name>
                <Infos>
                  <span>🕒 {recipe.duration / 60} Min</span>
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Recipe
                  </a>
                </Infos>
              </Item>
            )
          })}
        </List>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>no results</div>
      )}
    </Container>
  )
}

RecipeList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  savedRecipes: PropTypes.array.isRequired,
  toggleRecipe: PropTypes.func.isRequired,
}

export default RecipeList

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  padding: 48px 0;
  overflow-y: auto;
`

const List = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 16px 8px;
  max-width: 1200px;
  margin: 0 auto;
`

const Item = styled.button`
  background: #fff;
  border: 1px solid ${(props) => (props.isSaved ? '#666' : '#ccc')};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, ${(props) => (props.isSaved ? 0.5 : 0.1)});
`

const Image = styled.div`
  height: 230px;
  background: url(${(props) => props.url}) center;
  background-size: cover;
`

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid #ccc;
`

const Star = styled.span`
  filter: grayscale(${(props) => (props.isSaved ? 0 : 1)});
`

const RecipeList = ({ recipes, savedRecipes, toggleRecipe }) => {
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
                <Image url={recipe.imageUrl} />
                <Name>
                  {recipe.name}
                  <Star isSaved={isRecipeSaved}>⭐</Star>
                </Name>
                <Infos>
                  <span>{recipe.duration / 60} Min</span>
                  <a
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
      ) : (
        <div>no results</div>
      )}
    </Container>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  savedRecipes: PropTypes.array.isRequired,
  toggleRecipe: PropTypes.func.isRequired,
}

export default RecipeList

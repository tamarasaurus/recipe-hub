import * as api from '../../utils/api'

describe('api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('fetches recipes from the api', () => {
    fetch.mockResponseOnce(JSON.stringify([]))

    const keywords = 'poulet'
    const offset = 24

    api.getRecipes({ keywords, offset })
    expect(fetch.mock.calls[0][0]).toEqual(
      'http://localhost:8000/api/recipes?keywords=poulet&offset=24&sort=created&order=desc&liked=0',
    )
  })

  it('saves a recipe with the api', () => {
    fetch.mockResponseOnce(JSON.stringify([]))

    const recipeId = 1
    api.saveRecipe(recipeId)
    expect(fetch.mock.calls[0][0]).toEqual(
      'http://localhost:8000/api/recipes/1/save',
    )
    expect(fetch.mock.calls[0][1]).toEqual({ method: 'POST' })
  })
})

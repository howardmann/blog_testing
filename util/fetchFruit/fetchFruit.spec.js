let fetchFruit = require('./index')

describe('.fetchFruit', () => {
  // full integration test using async await
  // in development this can take too long  
  test.skip('should sample a random item from an array', async() => {
    let input = 'apple'
    let resp = await fetchFruit(input, axios)
    // axios library returns response in data property
    let actual = resp.data
    let expected = {
      "genus": "Malus",
      "name": "Apple",
      "id": 6,
      "family": "Rosaceae",
      "order": "Rosales",
      "nutritions": {
        "carbohydrates": 11.4,
        "protein": 0.3,
        "fat": 0.4,
        "calories": 52,
        "sugar": 10.3
      }
    }
    expect(actual).toEqual(expected)
  })

  // Stubbing responses using dependency injection
  test('should fake fetch a fruit object', async() => {
    // object that our fake requester will resolve to
    let expected = {
      "genus": "Malus",
      "name": "Apple",
      "id": 6,
      "family": "Rosaceae",
      "order": "Rosales",
      "nutritions": {
        "carbohydrates": 11.4,
        "protein": 0.3,
        "fat": 0.4,
        "calories": 52,
        "sugar": 10.3
      }
    }

    // fake Axios request function with a get method that resolved our expected fruit object
    let fakeAxiosRequest = {
      get: () => {
        return Promise.resolve({data: expected})
      }
    }

    // Check our stub works
    // Note: we create and test this fake fetch stub in order to test multiple other functions. There is low value in testing a stub standalone 
    let input = 'apple'
    let resp = await fetchFruit(input, fakeAxiosRequest)
    let actual = resp.data
    expect(actual).toEqual(expected)
  })


})
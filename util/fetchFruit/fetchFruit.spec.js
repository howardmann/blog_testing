let {fetchFruit, fetchFruitWithKj} = require('./index')

// our expected API fetch result we will test across our suites 
const FETCH_RESULT = {
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

describe('.fetchFruit', () => {
  // full integration test using async await
  // in development this can take too long  
  test.skip('should sample a random item from an array', async() => {
    let input = 'apple'
    let resp = await fetchFruit(input, axios)
    // axios library returns response in data property
    let actual = resp.data
    let expected = FETCH_RESULT
    expect(actual).toEqual(expected)
  })

  // Stubbing responses using dependency injection
  test('should fake fetch a fruit object', async() => {
    // fake Axios request function with a get method that resolved our expected fruit object
    let fakeAxiosRequest = {
      get: () => {
        return Promise.resolve({data: FETCH_RESULT})
      }
    }

    // Check our stub works
    // Note: we create and test this fake fetch stub in order to test multiple other functions. There is low value in testing a stub standalone 
    let input = 'apple'
    let resp = await fetchFruit(input, fakeAxiosRequest)
    let actual = resp.data
    let expected = FETCH_RESULT

    expect(actual).toEqual(expected)
  })
})

describe('.fetchFruitWithKj', () => {
  // Using our stub we can test functions combined with 3rd party API requests
  test('should fake fetch a fruit object with converted kj value', async() => {
    // our fake Axios stub
    let fakeAxiosRequest = {
      get: () => {
        return Promise.resolve({data: FETCH_RESULT})
      }
    }

    // Make copy of FETCH_RESULT object and add nested kj value
    const FETCH_RESULT_KJ = JSON.parse(JSON.stringify(FETCH_RESULT))
    FETCH_RESULT_KJ["nutritions"]["kilojoules"] = 217.568

    let input = 'apple'
    let actual = await fetchFruitWithKj(input, fakeAxiosRequest)    
    let expected = FETCH_RESULT_KJ

    expect(actual).toStrictEqual(expected)
  })
})
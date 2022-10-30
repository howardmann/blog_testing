let axios = require('axios')

let fetchFruit = (fruit, request=axios) => {
  let api = "https://www.fruityvice.com/api/fruit/"
  let url = api + fruit

  return request.get(url)
    .catch(err => {
      throw new Error(`fetchFruit: ${err}`)
    })
}

module.exports = fetchFruit
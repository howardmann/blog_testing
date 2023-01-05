let axios = require('axios')
let convertCalToKJ = require('../convertCalToKj')

let fetchFruit = (fruit, request=axios) => {
  let api = "https://www.fruityvice.com/api/fruit/"
  let url = api + fruit

  return request.get(url)
    .catch(err => {
      throw new Error(`fetchFruit: ${err}`)
    })
}

let fetchFruitWithKj = async (fruit, request=axios) => {
  let resp = await fetchFruit(fruit, request)
  let output = resp.data  
  let calories = output.nutritions.calories
  let kj = convertCalToKJ(calories)    
  // creae copy of output to not mutate
  let newOutput = JSON.parse(JSON.stringify(output))
  newOutput['nutritions']['kilojoules'] = kj
  return newOutput
}

module.exports = {
  fetchFruit,
  fetchFruitWithKj
}
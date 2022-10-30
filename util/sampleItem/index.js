let sampleItem = (arr) => {
  if (!Array.isArray(arr)) { throw new Error('not an array')}
  let randIndex = Math.floor(Math.random() * arr.length)
  return arr[randIndex]
}

module.exports = sampleItem
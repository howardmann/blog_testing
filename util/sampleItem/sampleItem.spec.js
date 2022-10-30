let sampleItem = require('./index')

// Testing randomness
describe.only('.sampleItem', () => {
  // Test happy path
  test('should sample a random item from an array', () => {
    let input = ['apple', 'banana', 'orange', 'pear']
    let actual = sampleItem(input)

    // Test if random sample is included in input array. Use .toContain
    expect(input).toContain(actual)
  })

  // Test unhappy path
  test('should throw error if not given an array', () => {
    // Test all non-strings
    let inputArr = [42, undefined, true, 'word', {}]
    let actual = (input) => sampleItem(input)
    let expected = "not an array"
    
    // Use forEach loop to test for multiple error assertions
    inputArr.forEach(input => {
      expect(() => actual(input)).toThrow(expected)
    })
  })



})
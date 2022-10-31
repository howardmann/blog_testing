let convertCalToKj = require('./index')

describe('.convertCalToKj', () => {
  // Test happy path
  test('should convert calories to kilojoules', () => {
    let input = 52
    let actual = convertCalToKj(input)
    let expected = 217.568

    expect(actual).toBe(expected)
  })

  test('should work for number strings', () => {
    let input = '52'
    let actual = convertCalToKj(input)
    let expected = 217.568

    expect(actual).toBe(expected)
  })

  // Test all unhappy paths
  test('should throw error if not given a string', () => {
    // Test non number inputs
    let inputArr = ['banana', undefined, true, false, [], {}]
    let actual = (input) => convertCalToKj(input)
    let expected = "not a number"
    
    // Use forEach loop to test for multiple error assertions
    inputArr.forEach(input => {
      expect(() => actual(input)).toThrow(expected)
    })
  })
})
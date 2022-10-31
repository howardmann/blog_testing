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

  // Test unhappy path
  test('should throw error if not given a number or number string', () => {
    let input = "banana"
    // When testing to throw errors wrap our `actual` in an arrow function and call it at run-time
    let actual = () => convertCalToKj(input)
    let expected = "not a number"
    
    // Call the function when inside the expect assertion and use `.toThrow()` to assert an Error has been thrown
    expect(() => actual()).toThrow(expected)
  })


  // Test all unhappy paths
  test('should throw error if not given a number string', () => {
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
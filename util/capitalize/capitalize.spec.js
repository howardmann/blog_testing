let capitalize = require('./index')

describe('capitalize', () => {
  // Test happy path
  test('should capitalize a single string', () => {
    // Follow basic `input` `actual` and `expected` style
    // 1. input = input parameters being passed to function being tested
    // 2. actual = actual output of function being passed input
    // 3. expected = expected result of the test case
    
    let input = 'hello'
    let actual = capitalize(input)
    let expected = 'Hello'

    // Basic assertion syntax
    // Assertions for strings, numbers use `.toBe()` whilst assertions for checking values of objects use `.toEqual()`    
    expect(actual).toBe(expected)
  })

  test('should capitalize a sentence', () => {
    let input = 'hello my name is bill'
    let actual = capitalize(input)
    let expected = "Hello My Name Is Bill"

    expect(actual).toBe(expected)
  })

  // Test unhappy path
  test('should throw error if given a number', () => {
    let input = 42
    // When testing to throw errors wrap our `actual` in an arrow function and call it at run-time
    let actual = () => capitalize(input)
    let expected = "not a string"
    
    // Call the function when inside the expect assertion and use `.toThrow()` to assert an Error has been thrown
    expect(() => actual()).toThrow(expected)
  })

  // Test all unhappy paths
  test('should throw error if not given a string', () => {
    // Test all non-strings
    let inputArr = [42, undefined, true, [], {}]
    let actual = (input) => capitalize(input)
    let expected = "not a string"
    
    // Use forEach loop to test for multiple error assertions
    inputArr.forEach(input => {
      expect(() => actual(input)).toThrow(expected)
    })
  })

})
# Unit Testing in JavaScript
Unit testing is a method to check that units of code work as expected. 

It helps teams ship product improvements without breaking existing functionality.

This article introduces the basics of unit testing in JavaScript and Node.js.

### Sections
1. Setup unit testing framework
2. Writing unit testing assertion style
3. Testing for validations and throwing errors
4. Handling asynchronous code
5. Using dependency injection to stub

Code for all examples can be [found here](https://github.com/howardmann/blog_testing).

## 1. Setup unit testing framework
We have been asked to build an API that fetches nutritional data for a given fruit. The 3rd party API already exists but we also need to display calories to kilojoules.

First we must setup our unit testing structure and framework. We will create two functions to achieve this:
1. Calorie to kilojoule converter
2. Fruit data fetcher

Test files should be kept close to the folders and functions being tested. Mirror the naming of your functions with a `.spec.js` extension.

```shell
├── convertCalToKj
│   └── index.js
│   └── convertCalToKj.spec.js
└── fetchFruit
│   └── index.js
│   └── fetchFruit.spec.js
```
We will install [`jest`](https://jestjs.io/) for our testing framework  but you could use other frameworks such as `mocha` and `chai`. We will also install `axios` in advance for our http requester which we will later stub.

```shell
npm init -y
npm i --save-dev jest
npm i --save axios
echo node_modules  >> .gitignore
```

Our package.json should look like below. Add to our scripts `"test: "jest"` and our `jest` config to auto run all files with our `.spec.js` extension.
```javascript
{
  "name": "blog_testing",
  "version": "1.0.0",
  "type": "module",
  "description": "Unit testing basics example",
  "main": "util.js",
  "scripts": {
    "test": "jest" // shortcut to run our test library with npm test
  },
  "author": "Howie Mann",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.1.3" // used for our data fetcher
  },
  "devDependencies": {
    "jest": "^29.2.2" // our testing framework
  },
  "jest": {
    "testMatch": ["**/*.spec.js"], // match all .spec.js files
    "verbose": true // display all individual tests
  }
}
```
## 2. Writing unit testing assertion style
First spec out the functionality we are expecting to test. Wrap our tests in `describe` and `test` blocks. `describe` encapsulates the related functions we are testing and `test` runs the tests.

```javascript
// convertCalToKj/convertCalToKj.spec.js

// Import the function we expect to test
let convertCalToKj = require('./index')

describe('.convertCalToKj', () => {
  // test happy path
  test('should convert calories to kilojoules', () => {
  })

  // test edge cases
  test('should work for number strings', () => {
  })

  // test for errors
  test('should throw error if not given a string', () => {
  })
})
```

Write unit tests following this assertion style:
1. **Input**: the input parameter we pass to the function we are testing
2. **Actual**: the actual result of passing the input to our function `function(input)`
3. **Expected**: the expected result from passing the input to our function

Then compare the actual vs expected resut to check if they match.

Let's apply this assertion style to our first two specs.
```javascript
// convertCalToKj/convertCalToKj.spec.js

// Import the function we expect to test
let convertCalToKj = require('./index')

describe('.convertCalToKj', () => {
  // test happy path
  test('should convert calories to kilojoules', () => {
    // Follow basic `input` `actual` and `expected` style
    // 1. input = input parameters being passed to function being tested
    // 2. actual = actual output of function being passed input
    // 3. expected = expected result of the test case

    let input = 52
    let actual = convertCalToKj(input)
    let expected = 217.568

    // Basic assertion syntax
    // Assertions for strings, numbers use `.toBe()` whilst assertions for checking values of objects use `.toEqual()` or `toStrictEqual()` for deep equality    
    expect(actual).toBe(expected)
  })

  // test edge cases
  test('should work for number strings', () => {
    let input = '52'
    let actual = convertCalToKj(input)
    let expected = 217.568

    expect(actual).toBe(expected)
  })
})
```
We can now make our code work before running the tests to pass by running `npm test` in our terminal.

```javascript
// convertCalToKj/index.js
let convertCalToKj = (cal) => {
  let calorie = parseInt(cal)

  if (isNaN(calorie)) {
    throw new Error('not a number')
  }
  return calorie * 4.184 
}

module.exports = convertCalToKj
```


## 3. Testing for validations and throwing errors
We will write validations to ensure that only numbers or number strings are being passed. 

To test validations, we will deliberately pass inputs that we expect will throw errors. The `jest` framework requires the code we are error testing be wrapped in an anonymous function inside expect `expect(() => function(input))` with the assertion library using the method `toThrow()`.

Write a unit test for when a non number string input is passed to `convertToCalKj()` that an error is thrown with a message `not a number`.

```javascript
let convertCalToKj = require('./index')

describe('.convertCalToKj', () => {
  // Test unhappy path
  test('should throw error if not given a number or number string', () => {
    let input = "banana"
    // When testing to throw errors wrap our `actual` in an arrow function and call it at run-time
    let actual = () => convertCalToKj()
    let expected = "not a number"
    
    // Call the function when inside the expect assertion and use `.toThrow()` to assert an Error has been thrown
    expect((input) => actual()).toThrow(expected)
  })
})
```
Test for multiple bad inputs by looping through and testing each. This approach can also be used for testing multiple happy inputs.
```javascript
let convertCalToKj = require('./index')

describe('.convertCalToKj', () => {
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
```

## 4. Handling asynchronous code
We will first write an integration test that relies on an external 3rd party library to fetch data. We will test that `fetchFruit(fruit)` will return nutritional information for a given fruit.

We will import `axios` as our request library to dependency inject into `fetchFruit` this will allow us to stub this out in our later tests. Remember to use `async` `await` when testing asynchronous code.

Follow the same assertion style to test that the actual response Object matches the expected Object.
```javascript
// fetchFruit/fetchFruit.spec.js
// Import our function that we are testing
let {fetchFruit} = require('./index')
// Import our request library used for integration test
let axios = require('axios')

describe('.fetchFruit', () => {
  // full integration test using async await
  test('should fetch nutrition information for a given fruit', async() => {
    let input = 'apple'
    // axios library returns response in data property
    let resp = await fetchFruit(input, axios)
    let actual = resp.data
    // Expected API response
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

    // assertions for objects use .toEqual()
    expect(actual).toEqual(expected)
  })
})
```

Now write our code to satisfy the above spec and pass the tests. We dependency inject our http request helper using default params which will default to using the `axios` library if none is given.
```javascript
// fetchFruit/index.js
let axios = require('axios')

// request=axios default params  allow us to stub for testing
let fetchFruit = (fruit, request=axios) => {
  // 3rd party API library
  let api = "https://www.fruityvice.com/api/fruit/"
  let url = api + fruit

  return request.get(url)
    .catch(err => {
      throw new Error(`fetchFruit: ${err}`)
    })
}
```
## 5. Using dependency injection to stub
We use dependency injection to pass any third party libraries like our http request library `axios` as arguments to our functions.

This allows us to stub them out when writing testing to return an expected fixture we can use to test other functions which we will do next.

To create our stub write a `fakeAxiosRequest` Object which has a similar API method `.get` and returns the expected data as a Promise. Then write a unit test to ensure the stub is working.

```javascript
// 
let {fetchFruit} = require('./index')
let axios = require('axios')

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
```
Writing stubs with fake requests has the benefit of allowing us to combine tests with other utilities.

Let's put it all together and create a function `fetchFruitWithKj` that fetches nutritional information for a given fruit and also converts and displays the calories in kilojoules.
```javascript
// fetchFruit/index.js
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
  let resp = await request.get(fruit, request)
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
```

We can dependency inject our fakeAxiosRequest stub and test that `fetchFruitWithKj("apple", fakeAxiosRequest)` returns the nutritional information with calories converted to kilojoules.

```javascript
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
```


Code for all examples can be [found here](https://github.com/howardmann/blog_testing)

### References
- Blog by James Sinclair - [TDD Should be Fun](https://jrsinclair.com/articles/2016/tdd-should-be-fun/)
- Video by Dev Mastery - [The Ultimate Coding Workflow](https://www.youtube.com/watch?v=nK3LP-pn_08)




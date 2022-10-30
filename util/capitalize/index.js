let capitalize = (string) => {
  if (typeof string !== 'string') { 
    throw new Error('not a string')
  }
  // capitalize single word
  let capitalizeWord = (word) => word[0].toUpperCase() + word.substr(1)
  // return capitalizeWord(string)

  // capitalize multiple words
  const words = string.split(" ")
  return words.map(word => capitalizeWord(word)).join(" ")  
}

module.exports = capitalize
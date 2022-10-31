let convertCalToKj = (cal) => {
  let calorie = parseInt(cal)

  if (isNaN(calorie)) {
    throw new Error('not a number')
  }
  return calorie * 4.184 
}

module.exports = convertCalToKj
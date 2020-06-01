export const determineConcat = (docs, index, ampersand = true) => {
  const numOfDocs = docs.length
  if (numOfDocs - 2 === index && ampersand) {
    return " & "
  } else if (numOfDocs - 1 === index) {
    return null
  } else {
    return ", "
  }
}
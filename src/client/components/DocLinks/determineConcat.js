const determineConcat = (docs, index) => {
  const numOfDocs = docs.length
  if (numOfDocs - 2 === index) {
    return " & "
  } else if (numOfDocs - 1 === index) {
    return null
  } else {
    return ", "
  }
}

export default determineConcat

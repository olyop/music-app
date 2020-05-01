const determineDocIdKey = doc =>
  Object.keys(doc)
    .filter(key => key.includes("Id"))
    .shift()

export default determineDocIdKey

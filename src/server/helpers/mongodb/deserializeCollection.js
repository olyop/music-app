import deserializeDocument from "./deserializeDocument.js"

const deserializeCollection = collection => collection.map(deserializeDocument)

export default deserializeCollection

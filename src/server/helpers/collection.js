const { ObjectId } = require("mongodb")
const { orderBy } = require("lodash")

const serializeDocument = doc => {
  const temp = doc.toObject()
  const { _id, ...values } = temp
  return {
    ...values,
    key: _id,
    createdAt: ObjectId(_id).getTimestamp()
  }
}

const serializeCollection = collection => collection.map(serializeDocument)

const sortCollection = (keyName, direction = "asc") => collection => (
  orderBy(collection, keyName, direction)
)

Object.assign(exports, {  
  serializeDocument,
  serializeCollection,
  sortCollection
})
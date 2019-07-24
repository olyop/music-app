const { ObjectId } = require("mongodb")
const { orderBy } = require("lodash")

const serializeDocument = doc => {
  const temp = doc.toObject()
  const { _id, ...values } = temp
  return {
    ...values,
    id: _id,
    createdAt: ObjectId(_id).getTimestamp()
  }
}

const serializeCollection = collection => collection.map(serializeDocument)

const orderCollection = (iteratees, orders) => collection => (
  orderBy(collection, iteratees, orders)
)

Object.assign(exports, {  
  serializeDocument,
  serializeCollection,
  orderCollection
})

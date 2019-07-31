const { ObjectId } = require("mongodb")
const { assign } = require("lodash")

const serializeDocument = doc => {
  const { _id, __v, ...values } = doc
  return {
    ...values,
    id: _id,
    version: __v,
    createdAt: ObjectId(_id).getTimestamp()
  }
}

const serializeCollection = collection => collection.map(serializeDocument)

assign(exports, {  
  serializeDocument,
  serializeCollection
})

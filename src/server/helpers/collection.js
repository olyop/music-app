const { ObjectId } = require("mongodb")
const { assign } = require("lodash")

const serializeDocument = ({ _id, __v, ...values }) => ({
  ...values,
  id: _id,
  version: __v,
  createdAt: ObjectId(_id).getTimestamp()
})

const serializeCollection = collection => collection.map(serializeDocument)

assign(exports, {  
  serializeDocument,
  serializeCollection
})

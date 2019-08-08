import mongodb from "mongodb"

const { ObjectId } = mongodb

export const serializeDocument = ({ _id, __v, ...values }) => ({
  ...values,
  id: _id,
  version: __v,
  createdAt: ObjectId(_id).getTimestamp()
})

export const serializeCollection = collection => collection.map(serializeDocument)

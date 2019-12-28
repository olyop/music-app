export const serializeDocument = ({ _id, __v, ...values }) => ({
  ...values,
  id: _id,
})

export const serializeCollection = collection => collection.map(serializeDocument)

import client from "./client"

export const serializeDocument = ({ __typename, ...doc }) => doc
export const serializeCollection = collection => collection.map(serializeDocument)

export const fetchQuery = (options, resCallback) => client.query(options).then(resCallback)

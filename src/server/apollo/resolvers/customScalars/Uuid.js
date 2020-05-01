import graphql from "graphql"
import isUuid from "../../../helpers/validators/isUuid.js"

const { GraphQLScalarType, GraphQLError, Kind } = graphql

const name = "Uuid"

const description =
  `The Uuid scalar type represents UUID values
   as specified in RFC4122: https://tools.ietf.org/html/rfc4122/.`

const parse = value => {
  if (isUuid(value)) {
    return value
  } else {
    throw new GraphQLError(`Invalid uuid: ${value}`)
  }
}

const parseLiteral = ({ kind, value }) => {
  if (kind === Kind.STRING) {
    return value
  } else {
    throw new GraphQLError(`Can only validate strings as uuids but got: ${kind}`)
  }
}

const Uuid = new GraphQLScalarType({
  name,
  description,
  parseLiteral,
  serialize: parse,
  parseValue: parse,
})

export default Uuid

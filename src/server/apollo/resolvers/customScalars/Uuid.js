import { GraphQLScalarType, GraphQLError, Kind } from "graphql"

import isUuid from "../../../helpers/validators/isUuid.js"

const name = "Uuid"

const description =
  `The Uuid scalar type represents UUID values
   as specified by [RFC 4122](https://tools.ietf.org/html/rfc4122).`

const serialize = value => {
  if (!isUuid(value)) {
    throw new GraphQLError(`UUID cannot represent non-UUID value: ${value}`)
  } else {
    value.toLowerCase()
  }
}

const parseLiteral = ast => {
  if (ast.kind === Kind.STRING) {
    return ast.value
  } else {
    throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`)
  }
}

const Uuid = new GraphQLScalarType({
  name,
  description,
  serialize,
  parseLiteral,
})

export default Uuid

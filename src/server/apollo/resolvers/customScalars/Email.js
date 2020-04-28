import { GraphQLScalarType, GraphQLError, Kind } from "graphql"

import isEmail from "../../../helpers/validators/isEmail.js"

const name = "Email"

const description =
  `A field whose value conforms to the standard internet email address
   format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.`

const serialize = value => {
  if (isEmail(value)) {
    return value
  } else {
    throw new GraphQLError(`Value is not a valid email address: ${value}`)
  }
}

const parseLiteral = ast => {
  if (ast.kind === Kind.STRING) {
    return ast.value
  } else {
    throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`)
  }
}

const Email = new GraphQLScalarType({
  name,
  description,
  serialize,
  parseLiteral,
})

export default Email

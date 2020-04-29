import graphql from "graphql"
import isEmail from "../../../helpers/validators/isEmail.js"

const { GraphQLScalarType, GraphQLError, Kind } = graphql

const name = "Email"

const description =
  `A field whose value conforms to the standard internet email address
   format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.`

const parse = value => {
  if (isEmail(value)) {
    return value
  } else {
    throw new GraphQLError(`Invalid email: ${value}`)
  }
}

const parseLiteral = ast => {
  if (ast.kind === Kind.STRING) {
    return ast.value
  } else {
    throw new GraphQLError(`Can only validate strings as email addresses but got: ${ast.kind}`)
  }
}

const Email = new GraphQLScalarType({
  name,
  description,
  parseLiteral,
  serialize: parse,
  parseValue: parse,
})

export default Email

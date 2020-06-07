import {
	Kind,
	ValueNode,
	GraphQLError,
	StringValueNode,
	GraphQLScalarType,
} from "graphql"

import { isEmail } from "../../helpers"

const name = "Email"

const description =
	`A field whose value conforms to the standard internet email address
	 format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.`

const parse = (value: string) => {
	if (isEmail(value)) {
		return value
	} else {
		throw new GraphQLError(`Invalid email: ${value}`)
	}
}

const isValueString = (value: ValueNode): value is StringValueNode =>
	value.kind === Kind.STRING

const parseLiteral = (ast: ValueNode) => {
	if (isValueString(ast)) {
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
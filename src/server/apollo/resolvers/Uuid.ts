import {
	Kind,
	ValueNode,
	GraphQLError,
	StringValueNode,
	GraphQLScalarType,
} from "graphql"

import { isUuid } from "../../helpers"

const name = "Uuid"

const description =
	`The Uuid scalar type represents UUID values
	 as specified in RFC4122: https://tools.ietf.org/html/rfc4122/.`

const parse = (value: string) => {
	if (isUuid(value)) {
		return value
	} else {
		throw new GraphQLError(`Invalid uuid: ${value}`)
	}
}

const isValueString = (value: ValueNode): value is StringValueNode =>
	value.kind === Kind.STRING

const parseLiteral = (ast: ValueNode) => {
	if (isValueString(ast)) {
		return ast.value
	} else {
		throw new GraphQLError(`Can only validate strings as uuids but got: ${ast.kind}`)
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
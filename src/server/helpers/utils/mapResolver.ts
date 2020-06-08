import { mapValues } from "lodash"
// import { GraphQLTypeResolver } from "graphql"

import { resolver } from "./resolver"

export const mapResolver = (obj: Record<string, unknown>) =>
	mapValues(obj, resolver)
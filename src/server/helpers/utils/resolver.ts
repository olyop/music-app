/*
	eslint-disable
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/
// import { GraphQLResolveInfo } from "graphql"
import { IFieldResolver } from "apollo-server-express"

export const resolver =
	<TParent, TContext>(callback: (val: any) => void): IFieldResolver<TParent, TContext> =>
		(parent, args, context, info) =>
			callback({ parent, args, context, info })
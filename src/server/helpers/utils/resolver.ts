/*
	eslint-disable
		max-len,
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/
import { GraphQLResolveInfo } from "graphql"
import { IFieldResolver } from "apollo-server-express"

type T<TParent, TArgs> = {
	args: TArgs,
	parent: TParent,
	info: GraphQLResolveInfo,
}

type C<R, P, A> =
	(val: T<P, A>) => R | Promise<R>

export const resolver =
	<R, P, A>(callback: C<R, P, A>): IFieldResolver<P, any, A> =>
		(parent, args, _, info) =>
			callback({ parent, args, info })
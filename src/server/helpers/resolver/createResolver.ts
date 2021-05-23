import { exists } from "@oly_op/pg-helpers"
import { isNull, isUndefined } from "lodash"
import type { GraphQLResolveInfo } from "graphql"
import { AuthenticationError } from "apollo-server-express"

import { Context, ResolverParameter } from "../../types"

export const createResolver =
	<P = undefined>() =>
		<R, A = undefined>(callback: Callback<P, R, A>, authenticate = true) =>
			async (parent: P, args: A, context: Context, info: GraphQLResolveInfo) => {
				const { authorization } = context
				if (authenticate) {
					if (isUndefined(authorization)) {
						throw new AuthenticationError("Token not provided.")
					} else if (isNull(authorization)) {
						throw new AuthenticationError("Token expired.")
					} else {
						const isValidUser =
							await exists(context.pg)({
								table: "users",
								column: "user_id",
								value: authorization.userId,
							})
						if (!isValidUser) {
							throw new AuthenticationError("User does not exist.")
						}
					}
				}

				return callback({ parent, args, context, info })
			}

type Callback<P, R, A> =
	(props: ResolverParameter<P, A>) => Promise<R>
import { AuthenticationError } from "apollo-server-express"

import { Context } from "../../types"

type Callback<P, R, A> =
	(props: { args: A, parent: P, context: Context }) => Promise<R>

export const createResolver =
	<P = undefined>() =>
		<R, A = undefined>(
			callback: Callback<P, R, A>,
			authenticate = true,
		) =>
			(parent: P, args: A, context: Context) => {
				if (authenticate && context.authorization === "null") {
					throw new AuthenticationError("JWT missing.")
				} else {
					return callback({ parent, args, context })
				}
			}
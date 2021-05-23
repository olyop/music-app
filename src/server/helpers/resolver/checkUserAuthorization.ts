import { ForbiddenError } from "apollo-server-express"

import { User, ResolverParameter } from "../../types"

export const checkUserAuthorization =
	<R, A>(callback: Callback<R, A>) =>
		(arg: ResolverParameter<User, A>) => {
			if (arg.context.authorization?.userId === arg.parent.userId) {
				return callback(arg)
			} else {
				throw new ForbiddenError("Unauthorized access to this user.")
			}
		}

export type Callback<R, A> =
	(arg: ResolverParameter<User, A>) => Promise<R>
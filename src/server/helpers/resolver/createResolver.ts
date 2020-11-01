import { Context } from "../../types"

type Callback<P, R, A> =
	(props: { args: A, parent: P, context: Context }) => Promise<R>

export const createResolver =
	<P = undefined>() =>
		<R, A = undefined>(callback: Callback<P, R, A>) =>
			(parent: P, args: A, context: Context) =>
				callback({ parent, args, context })
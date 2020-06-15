/*
	eslint-disable
		max-len,
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/

type Callback<R, P, A> =
	(val: { args: A, parent: P }) => R | Promise<R>

export const createResolver =
	<P = undefined>() =>
		<R, A = Record<string, unknown>>(callback: Callback<R, P, A>) =>
			(parent: P, args: A) =>
				callback({ parent, args })
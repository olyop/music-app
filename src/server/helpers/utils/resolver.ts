/*
	eslint-disable
		max-len,
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-assignment
*/

type C<R, P, A> =
	(val: { args: A, parent: P }) => R | Promise<R>

export const resolver =
	<T, A = Record<string, unknown>, P = Record<string, unknown>>(callback: C<T, P, A>) =>
		(parent: P, args: A) =>
			callback({ parent, args })
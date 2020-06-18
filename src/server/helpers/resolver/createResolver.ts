type Callback<P, R, A> =
	(props: { args: A, parent: P }) => R | Promise<R>

export const createResolver =
	<P = undefined>() =>
		<R, A = Record<string, unknown>>(callback: Callback<P, R, A>) =>
			(parent: P, args: A) =>
				callback({ parent, args })
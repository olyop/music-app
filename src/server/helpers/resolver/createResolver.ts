type Callback<P, R, A> =
	(props: { args: A, parent: P }) => Promise<R>

export const createResolver =
	<P = undefined>() =>
		<R, A = undefined>(callback: Callback<P, R, A>) =>
			(parent: P, args: A) =>
				callback({ parent, args })
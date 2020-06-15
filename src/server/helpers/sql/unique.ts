import { exists } from "./exists"

type TInput = {
	value: string,
	table: string,
	column: string,
}

export const unique = ({ value, table, column }: TInput) =>
	new Promise<boolean>(
		(resolve, reject) => {
			exists({ table, value, column })
				.then(res => resolve(!res))
				.catch(reject)
		},
	)
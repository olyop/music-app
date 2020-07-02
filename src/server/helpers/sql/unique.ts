import { exists } from "./exists"

interface Input {
	value: string,
	table: string,
	column: string,
}

export const unique = ({ value, table, column }: Input) =>
	new Promise<boolean>(
		(resolve, reject) => {
			exists({ table, value, column })
				.then(res => resolve(!res))
				.catch(reject)
		},
	)
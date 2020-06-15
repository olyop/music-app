import { exists } from "./exists"

type TInput = {
	value: string,
	table: string,
	column: string,
}

export const unique = ({ value, table, column }: TInput) =>
	new Promise<boolean>(
		(resolve, reject) => {
			sqlExists({ table, value, column })
				.then(exists => resolve(!exists))
				.catch(reject)
		},
	)
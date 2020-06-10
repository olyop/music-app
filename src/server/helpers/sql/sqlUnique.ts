import { sqlExists } from "./sqlExists"

type TInput = {
	value: string,
	table: string,
	column: string,
}

export const sqlUnique = ({ value, table, column }: TInput) =>
	new Promise<boolean>(
		(resolve, reject) => {
			sqlExists({ table, value, column })
				.then(exists => resolve(!exists))
				.catch(reject)
		},
	)
import sqlExists from "./sqlExists.js"

export const sqlUnique = ({ value, table, column }) => new Promise(
	(resolve, reject) => {
		sqlExists({ table, value, column })
			.then(exists => resolve(!exists))
			.catch(reject)
	},
)
import { GraphQLTypeResolver } from "graphql"

export const createStreamFromUpload = (upload: typeof GraphQLUpload) =>
	new Promise(
		(resolve, reject) => {
			upload
				.then(file => file.createReadStream())
				.then(resolve)
				.catch(reject)
		},
	)
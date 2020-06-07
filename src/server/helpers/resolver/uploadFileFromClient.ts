import { GraphQLUpload } from "graphql-upload"

import { concatStream } from "../utils/concatStream"
import { createStreamFromUpload } from "./createStreamFromUpload"

export const uploadFileFromClient = (upload: typeof GraphQLUpload) => new Promise(
	(resolve, reject) => {
		createStreamFromUpload(upload)
			.then(concatStream)
			.then(resolve)
			.catch(reject)
	},
)
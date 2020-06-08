import { FileUpload } from "graphql-upload"

import { concatStream } from "../utils/concatStream"
import { createStreamFromUpload } from "./createStreamFromUpload"

export const uploadFileFromClient = (upload: Promise<FileUpload>) =>
	new Promise<Buffer>(
		(resolve, reject) => {
			createStreamFromUpload(upload)
				.then(concatStream)
				.then(resolve)
				.catch(reject)
		},
	)
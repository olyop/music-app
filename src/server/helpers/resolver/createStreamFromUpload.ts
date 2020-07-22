import { ReadStream } from "fs"
import { FileUpload } from "graphql-upload"

export const createStreamFromUpload = (upload: Promise<FileUpload>) =>
	new Promise<ReadStream>(
		(resolve, reject) => {
			upload.then(file => file.createReadStream())
				.then(resolve)
				.catch(reject)
		},
	)
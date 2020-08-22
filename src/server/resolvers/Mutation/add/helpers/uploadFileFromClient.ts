import { FileUpload } from "graphql-upload"

import { concatStream } from "../../../../helpers"
import { createStreamFromUpload } from "./createStreamFromUpload"

export const uploadFileFromClient = (upload: Promise<FileUpload>) =>
	createStreamFromUpload(upload)
		.then(concatStream)
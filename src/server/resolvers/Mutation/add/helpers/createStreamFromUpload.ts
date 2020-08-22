import { FileUpload } from "graphql-upload"

export const createStreamFromUpload = (upload: Promise<FileUpload>) =>
	upload.then(file => file.createReadStream())
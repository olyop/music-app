import { S3FileType, S3FileExt } from "../../types"

export const catalogObjectKey =
	(id: string, type: S3FileType, ext: S3FileExt) =>
		`catalog/${id}/${S3FileType[type]}.${S3FileExt[ext]}`
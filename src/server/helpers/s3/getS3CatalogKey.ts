import { S3FileType, S3FileExt } from "../../types"

export const getS3CatalogKey =
	(id: string, type: S3FileType, ext: S3FileExt) =>
		`catalog/${id}/${S3FileType[type].toLowerCase()}.${S3FileExt[ext].toLowerCase()}`
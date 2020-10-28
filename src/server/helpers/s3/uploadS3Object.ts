import { APP } from "@oly_op/music-app-common/globals"

import { s3 } from "../../services"
import { S3UploadObjectInput } from "../../types"

export const uploadS3Object = ({ key, data }: S3UploadObjectInput) =>
	s3.upload({
		Key: key,
		Body: data,
		Bucket: APP,
		ACL: "public-read",
	}).promise()
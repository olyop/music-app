import { APP } from "@oly_op/music-app-common/globals"
import { PutObjectCommand } from "@aws-sdk/client-s3"

import { s3 } from "../../services"
import { S3UploadObjectInput } from "../../types"

export const uploadS3Object = ({ key, data }: S3UploadObjectInput) => {
	const command = new PutObjectCommand({
		Key: key,
		Body: data,
		Bucket: APP,
		ACL: "public-read",
	})
	return s3.send(command)
}
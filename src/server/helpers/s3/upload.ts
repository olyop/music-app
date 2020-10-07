import { APP } from "@oly_op/music-app-common/globals"

import { s3 } from "../../services"
import { S3Upload } from "../../types"

export const upload = ({ key, data }: S3Upload) =>
	s3.upload({
		Key: key,
		Body: data,
		Bucket: APP,
		ACL: "public-read",
	}).promise()
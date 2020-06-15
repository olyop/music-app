import s3 from "../../services/s3"

import { S3Upload } from "../../types"
import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../globals"

export const upload = ({ key, data }: S3Upload) =>
	s3.upload({
		Key: key,
		Body: data,
		ACL: AWS_S3_ACL,
		Bucket: AWS_S3_BUCKET,
	}).promise()
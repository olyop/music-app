import s3 from "../../services/s3.js"

import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../globals/environment.js"

type TInput = {
	key: string,
	data: Buffer,
}

export const s3Upload = ({ key, data }: TInput) =>
	s3.upload({
		Key: key,
		Body: data,
		ACL: AWS_S3_ACL,
		Bucket: AWS_S3_BUCKET,
	}).promise()
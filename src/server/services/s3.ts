import S3 from "aws-sdk/clients/s3"

import {
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
} from "../globals/environment.js"

const s3 = new S3({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

export default s3
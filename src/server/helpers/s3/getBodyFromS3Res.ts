import { GetObjectOutput, Body } from "aws-sdk/clients/s3"

export const getBodyFromS3Res = (res: GetObjectOutput) =>
	(res.Body!) as Extract<Body, Buffer>
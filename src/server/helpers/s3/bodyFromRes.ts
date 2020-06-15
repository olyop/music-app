import { GetObjectOutput, Body } from "aws-sdk/clients/s3"

export const bodyFromRes = (res: GetObjectOutput) =>
	(res.Body!) as Extract<Body, Buffer>
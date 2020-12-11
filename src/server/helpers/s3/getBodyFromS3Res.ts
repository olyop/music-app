import { GetObjectCommandOutput } from "@aws-sdk/client-s3"

export const getBodyFromS3Res = (res: GetObjectCommandOutput) => {
	const body = res.Body! as ReadableStream
	const reader = body.getReader()
	reader.read()
}
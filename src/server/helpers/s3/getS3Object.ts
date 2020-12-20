import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { APP as Bucket } from "@oly_op/music-app-common/globals"

import { getBodyFromS3Res } from "./getBodyFromS3Res"
import { GetS3ObjectInput } from "../../types"

export const getS3Object =
	(s3: S3Client) =>
		async <T>({ key: Key, parse }: GetS3ObjectInput<T>) => {
			const res = await s3.send(new GetObjectCommand({ Bucket, Key }))
			const body = await getBodyFromS3Res(res)
			return parse(body)
		}
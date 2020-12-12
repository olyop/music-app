import { APP } from "@oly_op/music-app-common/globals"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

import { getBodyFromS3Res } from "./getBodyFromS3Res"
import { GetS3ObjectInput } from "../../types"

export const getS3Object =
	(s3: S3Client) =>
		async <T>({ key, parse }: GetS3ObjectInput<T>) => {
			const command = new GetObjectCommand({ Bucket: APP, Key: key })
			const res = await s3.send(command)
			const body = await getBodyFromS3Res(res)
			return parse(body)
		}
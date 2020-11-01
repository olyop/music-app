import pipe from "@oly_op/pipe"
import { APP } from "@oly_op/music-app-common/globals"

import { getBodyFromS3Res } from "./getBodyFromS3Res"
import { S3Client, GetS3ObjectInput } from "../../types"

export const getS3Object =
	(s3: S3Client) =>
		async <T>({ key, parse }: GetS3ObjectInput<T>) => {
			const res = await s3.getObject({ Bucket: APP, Key: key }).promise()
			return pipe(getBodyFromS3Res, parse)(res)
		}
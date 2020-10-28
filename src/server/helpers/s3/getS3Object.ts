import pipe from "@oly_op/pipe"
import { identity, isUndefined } from "lodash"
import { APP } from "@oly_op/music-app-common/globals"

import { s3 } from "../../services"
import { getBodyFromS3Res } from "./getBodyFromS3Res"

type Parse<T> = (res: Buffer) => T

interface GetS3ObjectInput<T> {
	key: string,
	parse: Parse<T>,
}

export const getS3Object = async <T>(args: GetS3ObjectInput<T>) => {
	const parse = isUndefined(args.parse) ? identity as Parse<T> : args.parse
	const res = await s3.getObject({ Bucket: APP, Key: args.key }).promise()
	return pipe(getBodyFromS3Res, parse)(res)
}
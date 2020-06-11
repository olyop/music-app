import { Body } from "aws-sdk/clients/s3"
import { identity, isUndefined } from "lodash"

import { pipe } from "../utils"
import s3 from "../../services/s3"
import { AWS_S3_BUCKET } from "../../globals"
import { s3BodyFromRes } from "./s3BodyFromRes"

type TInput<T> = {
	key: string,
	parse: (val: Body) => T,
}

export const s3GetObject = <T>(args: TInput<T>) =>
	new Promise<T>(
		(resolve, reject) => {
			const parse = isUndefined(args.parse) ? identity : args.parse
			s3.getObject({ Bucket: AWS_S3_BUCKET, Key: args.key })
				.promise()
				.then(pipe(s3BodyFromRes, parse, resolve))
				.catch(reject)
		},
	)
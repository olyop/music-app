import { identity, isUndefined } from "lodash"

import { pipe } from "../utils"
import s3 from "../../services/s3"
import { bodyFromRes } from "./bodyFromRes"
import { AWS_S3_BUCKET } from "../../globals"

type TInput<T> = {
	key: string,
	parse: (res: Buffer) => T,
}

export const getObject = <T>(args: TInput<T>) =>
	new Promise<T>(
		(resolve, reject) => {
			const parse = isUndefined(args.parse) ? identity : args.parse
			s3.getObject({ Bucket: AWS_S3_BUCKET, Key: args.key })
				.promise()
				.then(pipe(bodyFromRes, parse, resolve))
				.catch(reject)
		},
	)
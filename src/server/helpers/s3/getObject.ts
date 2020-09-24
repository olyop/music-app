import pipe from "@oly_op/pipe"
import { identity, isUndefined } from "lodash"

import { s3 } from "../../services"
import { bodyFromRes } from "./bodyFromRes"
import { AWS_S3_BUCKET } from "../../globals"

interface Input<T> {
	key: string,
	parse: (res: Buffer) => T,
}

export const getObject = <T>(args: Input<T>) =>
	new Promise<T>(
		(resolve, reject) => {
			const parse = isUndefined(args.parse) ? identity : args.parse
			s3.getObject({ Bucket: AWS_S3_BUCKET, Key: args.key })
				.promise()
				.then(pipe(bodyFromRes, parse, resolve))
				.catch(reject)
		},
	)
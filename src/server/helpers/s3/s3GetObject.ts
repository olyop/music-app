import { identity, isUndefined } from "lodash"

import { pipe } from "../utils"
import s3 from "../../services/s3"
import { s3BodyFromRes } from "./s3BodyFromRes"

import { AWS_S3_BUCKET } from "../../globals/environment.js"

export const s3GetObject = (args) => new Promise(
	(resolve, reject) => {
		const parse = isUndefined(args.parse) ? identity : args.parse
		s3.getObject({ Bucket: AWS_S3_BUCKET, Key: args.key })
			.promise()
			.then(res => pipe(res)(s3BodyFromRes, parse, resolve))
			.catch(reject)
	},
)
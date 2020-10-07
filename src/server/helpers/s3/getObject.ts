import pipe from "@oly_op/pipe"
import { identity, isUndefined } from "lodash"
import { APP } from "@oly_op/music-app-common/globals"

import { s3 } from "../../services"
import { bodyFromRes } from "./bodyFromRes"

interface Input<T> {
	key: string,
	parse: (res: Buffer) => T,
}

export const getObject = <T>(args: Input<T>) =>
	new Promise<T>(
		(resolve, reject) => {
			const parse = isUndefined(args.parse) ? identity : args.parse
			s3.getObject({ Bucket: APP, Key: args.key })
				.promise()
				.then(pipe(bodyFromRes, parse, resolve))
				.catch(reject)
		},
	)
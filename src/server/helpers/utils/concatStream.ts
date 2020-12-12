import { ReadStream } from "fs"
import { Readable } from "stream"

export const concatStream = (stream: ReadStream | Readable) =>
	new Promise<Buffer>(
		(resolve, reject) => {
			const data: Buffer[] = []
			stream
				.on("data", (chunk: Buffer) => data.push(chunk))
				.on("end", () => resolve(Buffer.concat(data)))
				.on("error", reject)
		},
	)
import { ReadStream } from "fs"

export const concatStream = (stream: ReadStream) =>
	new Promise<Buffer>(
		(resolve, reject) => {
			const data: Buffer[] = []
			stream
				.on("data", (chunk: Buffer) => data.push(chunk))
				.on("end", () => resolve(Buffer.concat(data)))
				.on("error", reject)
		},
	)
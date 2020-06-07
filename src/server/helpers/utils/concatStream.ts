export const concatStream = (stream: ReadableStream) => new Promise(
	(resolve, reject) => {
		const chunks: string[] = []
		stream
			.on("data", chunk => chunks.push(chunk))
			.on("end", () => resolve(Buffer.concat(chunks)))
			.on("error", reject)
	},
)
export const toDataUrl = (buffer: Buffer) =>
	`data:image/jpeg;base64,${buffer.toString("base64")}`
export const blobToDataUrl = (blob: Blob): Promise<string> => new Promise(
	(resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.onload = event =>
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			resolve(event.target!.result! as string)
		fileReader.onerror = error =>
			reject(error)
		fileReader
			.readAsDataURL(blob)
	},
)

export const dataUrlToBlob = (dataUri: string): Blob => {
	const byteString = atob(dataUri.split(",")[1])
	const arrayBuffer = new ArrayBuffer(byteString.length)
	const intArray = new Uint8Array(arrayBuffer)
	for (let i = 0; i < byteString.length; i += 1) {
		intArray[i] = byteString.charCodeAt(i)
	}
	return new Blob([arrayBuffer], { type: "image/jpeg" })
}
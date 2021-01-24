export const dataUrlToBlob =
	(dataUrl: string): Blob => {
		const byteString = atob(dataUrl.split(",")[1])
		const arrayBuffer = new ArrayBuffer(byteString.length)
		const intArray = new Uint8Array(arrayBuffer)
		for (let i = 0; i < byteString.length; i += 1) {
			intArray[i] = byteString.charCodeAt(i)
		}
		return new Blob([arrayBuffer], { type: "image/jpeg" })
	}
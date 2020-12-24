export const blobToDataUrl =
	(blob: Blob) =>
		new Promise<string>(
			(resolve, reject) => {
				const fileReader = new FileReader()
				fileReader.onload = event =>
					resolve(event.target!.result! as string)
				fileReader.onerror = error =>
					reject(error)
				fileReader
					.readAsDataURL(blob)
			},
		)
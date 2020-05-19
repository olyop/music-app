export const blobToDataUrl = blob => new Promise(
  (resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => { resolve(event.target.result) }
    fileReader.onerror = error => { reject(error) }
    fileReader.readAsDataURL(blob)
  },
)

export const dataUrlToBlob = dataURI => {
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataURI.split(",")[1])

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob
  return new Blob([ab], { type: "image/jpeg" })
}

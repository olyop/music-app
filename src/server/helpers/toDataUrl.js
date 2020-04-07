const toDataUrl = binary => `data:image/jpeg;base64,${binary.toString("base64")}`

export default toDataUrl

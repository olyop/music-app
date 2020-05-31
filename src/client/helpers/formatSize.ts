const sizes = [ "Bytes", "KB", "MB", "GB", "TB" ]

const formatSize = (bytes: number): string => {
	if (bytes === 0) return "0 Byte"
	const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)))
	return `${Math.ceil(bytes / 1024 ** i)}${sizes[i]}`
}

export default formatSize
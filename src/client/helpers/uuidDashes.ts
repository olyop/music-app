export const uuidRemoveDashes = (val: string) =>
	val.replace(/-/g, "")

export const uuidAddDashes = (val: string) => {
	let temp = ""
	for (let i = 0; i < val.length; i += 1) {
		const char = val[i]
		if (i === 7 || i === 11 || i === 15 || i === 19) {
			temp += `${char}-`
		} else {
			temp += char
		}
	}
	return temp
}
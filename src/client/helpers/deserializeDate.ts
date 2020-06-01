export const deserializeDate = (unixTimeStamp: number): string => {
	const date = new Date(unixTimeStamp * 86400 * 1000)
	const year = date.getFullYear()
	const day = date.getDate()
	const month = date.getMonth() + 1
	return [
		`${day <= 9 ? "0" : ""}${day}`,
		`${month <= 9 ? "0" : ""}${month}`,
		year,
	].join("/")
}
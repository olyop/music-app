export const fixDateType = (val: Date) =>
	new Date(
		val.getFullYear(),
		val.getMonth() - 1,
		val.getDate() + 1,
	)
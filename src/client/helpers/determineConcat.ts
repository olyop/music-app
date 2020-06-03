type TReturn = " & " | ", " | null

export const determineConcat = <T>(docs: T[], index: number, ampersand = true): TReturn => {
	const numOfDocs = docs.length
	if (numOfDocs - 2 === index && ampersand) {
		return " & "
	} else if (numOfDocs - 1 === index) {
		return null
	} else {
		return ", "
	}
}
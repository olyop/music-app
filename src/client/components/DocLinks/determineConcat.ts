const determineConcat =
	<T>(docs: T[], index: number, ampersand = true) => {
		const numOfDocs = docs.length
		if (numOfDocs - 2 === index && ampersand) {
			return " & "
		} else if (numOfDocs - 1 === index) {
			return null
		} else {
			return ", "
		}
	}

export default determineConcat
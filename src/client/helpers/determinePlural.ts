type RType = "" | "s"

const determinePlural = (length: number): RType =>
	(length === 1 ? "" : "s")

export default determinePlural
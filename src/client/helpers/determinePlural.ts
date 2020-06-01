type RType = "" | "s"

export const determinePlural = (length: number): RType =>
	(length === 1 ? "" : "s")
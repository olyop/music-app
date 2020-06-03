export const determinePlural = (length: number): "" | "s" =>
	(length === 1 ? "" : "s")
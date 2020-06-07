export const determineReleased = (released: string) =>
	((new Date(released)).getTime() / 1000) / 86400
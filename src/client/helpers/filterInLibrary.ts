const filterInLibrary = <T extends { inLibrary: boolean }>(docs: T[]): T[] =>
	docs.filter(({ inLibrary }) => inLibrary)

export default filterInLibrary
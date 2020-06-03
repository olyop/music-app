import { LibDoc } from "../types"

export const filterInLibrary = <T extends LibDoc>(docs: T[]): T[] =>
	docs.filter(({ inLibrary }) => inLibrary)
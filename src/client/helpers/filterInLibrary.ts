import { UserDoc } from "../types"

export const filterInLibrary = <T extends UserDoc>(docs: T[]): T[] =>
	docs.filter(({ inLibrary }) => inLibrary)
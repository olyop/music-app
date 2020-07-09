import { Doc } from "../types"

export const determineDocIdKey = <T extends Doc>({ __typename }: T) =>
	(__typename ? `${__typename.toLowerCase()}Id` : "id" as unknown) as keyof T
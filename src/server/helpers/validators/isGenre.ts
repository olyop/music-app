import { isText } from "./isText"

export const isGenre = ({ name }: { name: string }) =>
	isText(name)
import { isText } from "./isText"

type Input = {
	name: string,
}

export const isGenre = ({ name }: Input) =>
	isText(name)
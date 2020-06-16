import { isText } from "./isText"
import { Genre } from "../../types"

export const isGenre = ({ name }: Genre) =>
	isText(name)
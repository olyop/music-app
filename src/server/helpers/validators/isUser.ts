import { isText } from "./isText.js"

export const isUser = ({ name }: { name: string }) =>
	isText(name)
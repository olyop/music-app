import { isText } from "./isText.js"

type Input = {
	name: string,
	email: string,
}

export const isUser = ({ name, email }: Input) =>
	isText(name) && isText(email)
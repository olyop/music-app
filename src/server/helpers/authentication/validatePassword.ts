import { isEmpty, inRange } from "lodash"

export const validatePassword =
	(password: string) => {
		const messages: string[] = []
		if (isEmpty(password)) {
			messages.push("Password cannot be empty.")
		} else if (!inRange(password.length, 5, 30)) {
			messages.push("Password must be between 5 and 30 characters")
		}
		return messages
	}
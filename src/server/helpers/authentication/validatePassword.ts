import { isEmpty, inRange } from "lodash"

interface ValidatePasswordReturn {
	isValid: boolean,
	message?: string,
}

export const validatePassword =
	(password: string): ValidatePasswordReturn => {
		if (isEmpty(password)) {
			return {
				isValid: false,
				message: "Password cannot be empty.",
			}
		} else if (!inRange(password.length, 5, 30)) {
			return {
				isValid: false,
				message: "Password must be between 5 and 30 characters",
			}
		} else {
			return {
				isValid: true,
			}
		}
	}
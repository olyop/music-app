import bcrypt from "bcrypt"

export const generateHash =
	(password: string) =>
		bcrypt.hash(password, 12)
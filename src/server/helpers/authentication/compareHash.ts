import bcrypt from "bcrypt"

export const compareHash =
	(plainText: string, hash: string) =>
		bcrypt.compare(plainText, hash)
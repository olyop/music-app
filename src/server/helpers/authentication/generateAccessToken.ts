import jwt from "jsonwebtoken"

export const generateAccessToken = (userId: string) =>
	jwt.sign(
		userId,
		process.env.TOKEN_SECRET!,
		{ expiresIn: 300 },
	)
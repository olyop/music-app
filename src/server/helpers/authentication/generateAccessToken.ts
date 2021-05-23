import jwt from "jsonwebtoken"

import { JWT_TOKEN_SECRET, JWT_SIGN_CONFIG } from "../../globals"

export const generateAccessToken =
	(userId: string) =>
		new Promise<string>(
			(resolve, reject) => {
				jwt.sign(
					{ userId },
					JWT_TOKEN_SECRET,
					JWT_SIGN_CONFIG,
					(err, token) => (
						err ? reject(err) : resolve(token!)
					),
				)
			},
		)
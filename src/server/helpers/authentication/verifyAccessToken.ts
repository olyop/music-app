import jwt, { TokenExpiredError } from "jsonwebtoken"

import { User } from "../../types"
import { JWT_TOKEN_SECRET } from "../../globals"

export const verifyAccessToken =
	(accessToken: string) => {
		try {
			return jwt.verify<User>(accessToken, JWT_TOKEN_SECRET)
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				return null
			} else {
				return undefined
			}
		}
	}
import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid"

import {
	sqlQuery,
	sqlExists,
	parseSqlRow,
	compareHash,
	generateHash,
	createResolver,
	validatePassword,
} from "../../helpers"

import { User, UserArgs } from "../../types"
import { INSERT_USER, SELECT_USER_PASSWORD } from "../../sql"

const resolver =
	createResolver()

interface LoginArgs extends UserArgs {
	password: string,
}

export const login =
	resolver<string | null, LoginArgs>(
		async ({ args, context }) => {
			const exists = await sqlExists(context.pg)({
				table: "users",
				column: "user_id",
				value: args.userId,
			})
			if (exists) {
				const user = await sqlQuery(context.pg)({
					sql: SELECT_USER_PASSWORD,
					parse: parseSqlRow<User>(),
					variables: [{
						key: "userId",
						value: args.userId,
					}],
				})
				const isValid = await compareHash(args.password, user.password)
				if (isValid) {
					return jwt.sign(
						{ userId: user.userId },
						process.env.TOKEN_SECRET!,
						{ expiresIn: "5m" },
					)
				} else {
					return null
				}
			} else {
				return null
			}
		},
		false,
	)

interface CreateAccountArgs {
	name: string,
	email: string,
	password: string,
}

export const createAccount =
	resolver<string, CreateAccountArgs>(
		async ({ args, context }) => {
			const validation = validatePassword(args.password)
			if (!validation.isValid) {
				return validation.message!
			} else {
				await sqlQuery(context.pg)({
					sql: INSERT_USER,
					variables: [{
						key: "name",
						value: args.name,
						parameterized: true,
					},{
						key: "email",
						value: args.name,
						parameterized: true,
					},{
						key: "userId",
						value: uuid(),
						parameterized: true,
					},{
						key: "password",
						parameterized: true,
						value: await generateHash(args.password),
					}],
				})
				return "success"
			}
		},
	)
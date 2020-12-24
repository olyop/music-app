import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid"
import { ValidationError } from "apollo-server-express"

import {
	sqlJoin,
	sqlQuery,
	sqlExists,
	parseSqlRow,
	compareHash,
	generateHash,
	createResolver,
	validatePassword,
} from "../../helpers"

import { COLUMN_NAMES } from "../../globals"
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
				throw new ValidationError(validation.message!)
			} else {
				const { userId } = await sqlQuery(context.pg)({
					sql: INSERT_USER,
					parse: parseSqlRow<User>(),
					variables: [{
						key: "userId",
						value: uuid(),
					},{
						key: "name",
						value: args.name,
						parameterized: true,
					},{
						key: "email",
						value: args.name,
						parameterized: true,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.USER),
					},{
						key: "password",
						parameterized: true,
						value: await generateHash(args.password),
					}],
				})
				return jwt.sign(
					{ userId },
					process.env.TOKEN_SECRET!,
					{ expiresIn: "5m" },
				)
			}
		},
		false,
	)
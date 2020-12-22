import { v4 as uuid } from "uuid"

import {
	sqlQuery,
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
	resolver<string, LoginArgs>(
		async ({ args, context }) => {
			const { password } = await sqlQuery(context.pg)({
				sql: SELECT_USER_PASSWORD,
				parse: parseSqlRow<User>(),
				variables: [{
					key: "userId",
					value: args.userId,
				}],
			})
			const isValid = await compareHash(args.password, password)
			return isValid ? "success" : "invalid"
		},
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
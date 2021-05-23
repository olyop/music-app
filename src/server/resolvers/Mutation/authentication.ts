import {
	join,
	query,
	exists,
	parseRow,
} from "@oly_op/pg-helpers"

import bcrypt from "bcrypt"
import { isEmpty } from "lodash"
import { v4 as uuid } from "uuid"
import { ValidationError } from "apollo-server-express"

import {
	createResolver,
	validatePassword,
	generateAccessToken,
} from "../../helpers"

import { User } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { INSERT_USER, SELECT_USER_PASSWORD } from "../../sql"

const resolver =
	createResolver()

export const login =
	resolver<string | null, LoginArgs>(
		async ({ args, context }) => {
			const accountExists =
				await exists(context.pg)({
					table: "users",
					column: "user_id",
					value: args.userId,
				})
			if (accountExists) {
				const { userId, password } =
					await query(context.pg)({
						sql: SELECT_USER_PASSWORD,
						parse: parseRow<User>(),
						variables: [{
							key: "userId",
							value: args.userId,
						}],
					})
				const isValid =
					await bcrypt.compare(args.password, password)
				if (isValid) {
					return generateAccessToken(userId)
				} else {
					return null
				}
			} else {
				return null
			}
		},
		false,
	)

export const createAccount =
	resolver<string, CreateAccountArgs>(
		async ({ args, context }) => {
			const validation =
				validatePassword(args.password)
			if (isEmpty(validation)) {
				throw new ValidationError(validation.toString())
			} else {
				const { userId } =
					await query(context.pg)({
						sql: INSERT_USER,
						parse: parseRow<User>(),
						variables: [{
							key: "userId",
							value: uuid(),
						},{
							key: "name",
							value: args.name,
							parameterized: true,
						},{
							key: "email",
							value: args.email,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER),
						},{
							key: "password",
							parameterized: true,
							value: await bcrypt.hash(args.password, 12),
						}],
					})
				return generateAccessToken(userId)
			}
		},
		false,
	)

interface CreateAccountArgs {
	name: string,
	email: string,
	password: string,
}

interface LoginArgs {
	userId: string,
	password: string,
}
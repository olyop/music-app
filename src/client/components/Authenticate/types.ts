import { JwtPayload } from "jwt-decode"
import { ChangeEventHandler } from "react"

export interface LoginData {
	login: string,
}

export interface LoginVars {
	userId: string,
	password: string,
}

export interface CreateAccountData {
	createAccount: string,
}

export interface CreateAccountVars {
	name: string,
	email: string,
	password: string,
}

export interface FormStateLogin {
	userId: string,
	password: string,
}

export interface FormStateCreateAccount {
	name: string,
	email: string,
	password: string,
}

export interface FormState {
	login: FormStateLogin,
	createAccount: FormStateCreateAccount,
}

export interface Jwt extends JwtPayload {
	userId: string,
}

export type FormChange = (
	formKey: keyof FormState,
	fieldKey: keyof (FormStateLogin & FormStateCreateAccount)
) => ChangeEventHandler<HTMLInputElement>
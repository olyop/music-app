import {
	FC,
	useState,
	Fragment,
	useEffect,
	createElement,
	ChangeEventHandler,
	FormEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import jwtDecode, { JwtPayload } from "jwt-decode"

import Button from "../Button"
import LOGIN from "./login.gql"
import { UserVar } from "../../types"
import CREATE_ACCOUNT from "./createAccount.gql"
import { useMutation, uuidAddDashes } from "../../helpers"
import { useStateUserId, updateUserId, useDispatch } from "../../redux"

import "./index.scss"

const bem = createBem("Authenticate")

const defaultFormState: FormState = {
	login: {
		userId: "",
		password: "",
	},
	createAccount: {
		name: "",
		email: "",
		password: "",
	},
}

const isLoginForm =
	(form: FormStateLogin | FormStateCreateAccount): form is FormStateLogin =>
		"userId" in form

const Authenticate: FC = ({ children }) => {
	const dispatch = useDispatch()
	const userIdState = useStateUserId()

	const [ toggle, setToggle ] =
		useState(true)

	const [ forms, setForms ] =
		useState<FormState>(defaultFormState)

	const [ login ] =
		useMutation<LoginData, LoginVars>(LOGIN)

	const [ createAccount ] =
		useMutation<CreateAccountData, CreateAccountVars>(CREATE_ACCOUNT)

	const loginWithJwt =
		(jwt: string) => dispatch(updateUserId(jwtDecode<Jwt>(jwt).userId))

	const handleLogin =
		async (form: FormStateLogin) => {
			const { password } = form
			const userId = uuidAddDashes(form.userId)

			const { data } =
				await login({ variables: { userId, password } })

			if (data && data.login !== null) {
				localStorage.setItem("authorization", data.login)
				loginWithJwt(data.login)
			}
		}

	const handleCreateAccount =
		async (form: FormStateCreateAccount) => {
			const { name, email, password } = form

			const { data } =
				await createAccount({ variables: { name, email, password } })

			if (data && data.createAccount !== null) {
				localStorage.setItem("authorization", data.createAccount)
				loginWithJwt(data.createAccount)
				setForms(defaultFormState)
			}
		}

	const handleToggle =
		() => {
			setForms(defaultFormState)
			setToggle(prevState => !prevState)
		}

	const handleFormChange: FormChange =
		(formKey, fieldKey) => event =>
			setForms(prevState => ({
				...prevState,
				[formKey]: {
					...prevState[formKey],
					[fieldKey]: event.target.value,
				},
			}))

	const handleFormSubmit: FormEventHandler =
		async event => {
			event.preventDefault()
			const form = forms[toggle ? "login" : "createAccount"]
			if (isLoginForm(form)) await handleLogin(form)
			else await handleCreateAccount(form)
		}

	useEffect(() => {
		const token = localStorage.getItem("authorization")
		if (token) loginWithJwt(token)
		return setForms(defaultFormState)
	}, [])

	return isEmpty(userIdState) ? (
		<div className={bem("")}>
			<div className={bem("content", "Elevated Padding BorderRadius")}>
				<h1 className="Heading1">
					Authenticate
				</h1>
				<Button
					onClick={handleToggle}
					className={bem("toggle", "MarginTopBottomHalf")}
					text={`Go to ${toggle ? "Signup" : "Login"} page`}
				/>
				<div className={bem("form")}>
					{toggle ? (
						<form onSubmit={handleFormSubmit}>
							<label
								children="User Identification"
								className={bem("label", "Text2 MarginBottomQuart")}
							/>
							<input
								maxLength={32}
								id="loginUserIdField"
								value={forms.login.userId}
								className={bem("input", "Text")}
								onChange={handleFormChange("login", "userId")}
							/>
							<label
								children="Password"
								className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
							/>
							<input
								type="password"
								id="loginPasswordField"
								value={forms.login.password}
								className={bem("input", "Text")}
								onChange={handleFormChange("login", "password")}
							/>
							<input
								type="submit"
								className={bem("submit", "Text2 MarginTop")}
							/>
						</form>
					) : (
						<form onSubmit={handleFormSubmit}>
							<label
								children="Name"
								className={bem("label", "Text2 MarginBottomQuart")}
							/>
							<input
								id="createAccountNameField"
								value={forms.createAccount.name}
								className={bem("input", "Text")}
								onChange={handleFormChange("createAccount", "name")}
							/>
							<label
								children="Email"
								className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
							/>
							<input
								type="email"
								id="createAccountEmailField"
								className={bem("input", "Text")}
								value={forms.createAccount.email}
								onChange={handleFormChange("createAccount", "email")}
							/>
							<label
								children="Password"
								className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
							/>
							<input
								type="password"
								id="createAccountPasswordField"
								className={bem("input", "Text")}
								value={forms.createAccount.password}
								onChange={handleFormChange("createAccount", "password")}
							/>
							<input
								type="submit"
								className={bem("submit", "Text2 MarginTop")}
							/>
						</form>
					)}
				</div>
			</div>
		</div>
	) : (
		<Fragment>
			{children}
		</Fragment>
	)
}

interface LoginData {
	login: string,
}

interface LoginVars {
	userId: string,
	password: string,
}

interface CreateAccountData {
	createAccount: string,
}

interface CreateAccountVars {
	name: string,
	email: string,
	password: string,
}

interface FormStateLogin {
	userId: string,
	password: string,
}

interface FormStateCreateAccount {
	name: string,
	email: string,
	password: string,
}

interface FormState {
	login: FormStateLogin,
	createAccount: FormStateCreateAccount,
}

interface Jwt extends JwtPayload, UserVar {}

type FormChange = (
	formKey: keyof FormState,
	fieldKey: keyof (FormStateLogin & FormStateCreateAccount)
) => ChangeEventHandler<HTMLInputElement>

export default Authenticate
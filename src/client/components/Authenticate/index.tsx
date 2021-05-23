import {
	FC,
	useState,
	Fragment,
	useEffect,
	createElement,
	FormEventHandler,
} from "react"

import isNull from "lodash/isNull"
import { createBem } from "@oly_op/bem"

import {
	FormState,
	LoginData,
	LoginVars,
	FormChange,
	FormStateLogin,
	CreateAccountData,
	CreateAccountVars,
	FormStateCreateAccount,
} from "./types"

import Button from "../Button"
import LOGIN from "./login.gql"
import { useMutation } from "../../hooks"
import initFormState from "./initFormState"
import CREATE_ACCOUNT from "./createAccount.gql"
import { getJwt, setJwt, uuidAddDashes } from "../../helpers"

import "./index.scss"

const bem = createBem("Authenticate")

const isLoginForm =
	(form: FormStateLogin | FormStateCreateAccount): form is FormStateLogin =>
		"userId" in form

const Authenticate: FC = ({ children }) => {
	const [ wait, setWait ] =
		useState(true)

	const [ toggle, setToggle ] =
		useState(true)

	const [ forms, setForms ] =
		useState<FormState>(initFormState)

	const [ login ] =
		useMutation<LoginData, LoginVars>(LOGIN)

	const [ createAccount ] =
		useMutation<CreateAccountData, CreateAccountVars>(CREATE_ACCOUNT)

	const handleLogin =
		async (form: FormStateLogin) => {
			const { password } = form
			const userId = uuidAddDashes(form.userId)

			const { data } =
				await login({ variables: { userId, password } })

			if (data && data.login !== null) {
				setJwt(data.login)
				location.reload()
			}
		}

	const handleCreateAccount =
		async (form: FormStateCreateAccount) => {
			const { name, email, password } = form

			const { data } =
				await createAccount({ variables: { name, email, password } })

			if (data && data.createAccount !== null) {
				setJwt(data.createAccount)
				setForms(initFormState)
				location.reload()
			}
		}

	const handleToggle =
		() => {
			setForms(initFormState)
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
		const timer = setTimeout(() => { setWait(false) }, 1000)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	if (!isNull(getJwt())) {
		return (
			<Fragment>
				{children}
			</Fragment>
		)
	} else {
		if (wait) {
			return null
		} else {
			return (
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
										autoComplete="username"
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
										autoComplete="current-password"
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
			)
		}
	}
}

export default Authenticate
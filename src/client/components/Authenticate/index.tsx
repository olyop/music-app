import {
	FC,
	useState,
	Fragment,
	createElement,
	ChangeEventHandler,
	FormEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"

import Button from "../Button"
import LOGIN from "./login.gql"
import CREATE_ACCOUNT from "./createAccount.gql"
import { useMutation, uuidAddDashes } from "../../helpers"
import { useStateUserId, updateUserId, useDispatch } from "../../redux"

import "./index.scss"

const bem = createBem("Authenticate")

const defaultFormState: FormState = {
	login: {
		userId: "fe25daaec4c842a881890ee8e2208670",
		password: "",
	},
	createAccount: {
		name: "",
		email: "",
		password: "",
	},
}

const isLoginForm =
	(form: FormStateLogin | FormStateCreateAccount): form is FormStateLogin => {
		if ("userId" in form) return true
		else return false
	}

const Authenticate: FC = ({ children }) => {
	const dispatch = useDispatch()
	const userIdState = useStateUserId()
	const [ toggle, setToggle ] = useState(true)
	const [ forms, setForms ] = useState<FormState>(defaultFormState)

	const [ login ] =
		useMutation<LoginData, LoginVars>(LOGIN)

	const [ createAccount ] =
		useMutation<CreateAccountData, CreateAccountVars>(CREATE_ACCOUNT)

	const handleToggle = () => {
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

	const handleFormSubmut: FormSubmit =
		async event => {
			event.preventDefault()
			const form = forms[toggle ? "login" : "createAccount"]
			if (isLoginForm(form)) {
				const { password } = form
				const userId = uuidAddDashes(form.userId)

				const { data, errors } =
					await login({ variables: { userId, password } })

				if (data!.login === "success" && isEmpty(errors)) {
					dispatch(updateUserId(userId))
				}
			} else {
				const { name, email, password } = form

				const { data, errors } =
					await createAccount({ variables: { name, email, password } })

				if (data!.createAccount === "success" && isEmpty(errors)) {
					setToggle(true)
				}
			}
		}

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
						<form onSubmit={handleFormSubmut}>
							<label
								children="User Identification"
								className={bem("label", "Text2 MarginBottomQuart")}
							/>
							<input
								maxLength={32}
								value={forms.login.userId}
								className={bem("input", "Text")}
								onChange={handleFormChange("login", "userId")}
							/>
							<label
								children="Password"
								className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
							/>
							<input
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
						<form onSubmit={handleFormSubmut}>
							<label
								children="Name"
								className={bem("label", "Text2 MarginBottomQuart")}
							/>
							<input
								value={forms.createAccount.name}
								className={bem("input", "Text")}
								onChange={handleFormChange("createAccount", "name")}
							/>
							<label
								children="Email"
								className={bem("label", "Text2 MarginBottomQuart MarginTop")}
							/>
							<input
								className={bem("input", "Text")}
								value={forms.createAccount.email}
								onChange={handleFormChange("createAccount", "email")}
							/>
							<label
								children="Password"
								className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
							/>
							<input
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

interface FormState {
	login: FormStateLogin,
	createAccount: FormStateCreateAccount,
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

type FormChange = (
	formKey: keyof FormState,
	fieldKey: keyof (FormStateLogin & FormStateCreateAccount)
) => ChangeEventHandler<HTMLInputElement>

type FormSubmit = FormEventHandler

export default Authenticate
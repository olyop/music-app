import { upperFirst } from "lodash"
import { RouteComponentProps } from "react-router-dom"
import { createElement, FC, Fragment, ChangeEventHandler } from "react"

import QueryApi from "../QueryApi"
import { reactBem } from "../../helpers"
import { ListStyleEnum, User } from "../../types"
import GET_USER from "../../graphql/queries/user.gql"
import { useListStyleContext } from "../../contexts/ListStyle"

import "./index.scss"

const bem = reactBem("UserPage")

const UserPage: FC<RouteComponentProps> = () => {
	const { listStyle, setListStyle } =
		useListStyleContext()
	const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event =>
		// @ts-ignore
		setListStyle(ListStyleEnum[event.target.value])
	return (
		<QueryApi<TData>
			query={GET_USER}
			className={bem("", "Padding")}
			children={
				({ user }) => (
					<Fragment>
						<h1 className={bem("name", "MarginBottom")}>{user.name}</h1>
						<h3 className={bem("option-text")}>List Style</h3>
						<select
							className={bem("select")}
							value={listStyle || "grid"}
							onChange={handleSelectChange}
						>
							<option
								value={ListStyleEnum.grid}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.grid)}
							/>
							<option
								value={ListStyleEnum.list}
								className={bem("select-option")}
								children={upperFirst(ListStyleEnum.list)}
							/>
						</select>
					</Fragment>
				)
			}
		/>
	)
}

type TData = {
	user: User,
}

export default UserPage
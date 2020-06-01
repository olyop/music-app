import { createElement, FC, Fragment, ChangeEventHandler } from "react"

import QueryApi from "../QueryApi"
import { reactBem } from "../../helpers"
import { ListStyleEnum } from "../../types"
import { useListStyleContext } from "../../contexts/ListStyle"

import GET_USER from "../../graphql/queries/getUser.gql"

import "./index.scss"

const bem = reactBem("UserPage")

const UserPage: FC = () => {
	const { listStyle, setListStyle } =
		useListStyleContext()
	const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event =>
		setListStyle(+event.target.value)
	return (
		<QueryApi
			query={GET_USER}
			className={bem("", "Padding")}
			children={
				({ user }) => <Fragment>
					<h1 className={bem("name", "MarginBottom")}>{user.name}</h1>
					<h3 className={bem("option-text")}>List Style</h3>
					<select
						value={listStyle}
						className={bem("select")}
						onChange={handleSelectChange}
					>
						<option
							value={ListStyleEnum.grid}
							children={ListStyleEnum.grid}
							className={bem("select-option")}
						/>
						<option
							value={ListStyleEnum.list}
							children={ListStyleEnum.list}
							className={bem("select-option")}
						/>
					</select>
				</Fragment>
			}
		/>
	)
}

export default UserPage
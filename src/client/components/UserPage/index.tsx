import { upperFirst } from "lodash"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment, ChangeEventHandler } from "react"

import QueryApi from "../QueryApi"
import { ListStyleEnum, User } from "../../types"
import GET_USER from "../../graphql/queries/user.gql"
import { useListStyleContext } from "../../contexts/ListStyle"

import "./index.scss"

const bem = createBem("UserPage")

const UserPage: FC = () => {
	const { listStyle, setListStyle } =
		useListStyleContext()
	const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event =>
		setListStyle(event.target.value as ListStyleEnum)
	return (
		<QueryApi<Data>
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

interface Data {
	user: User,
}

export default UserPage
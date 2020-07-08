import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, useState, FC } from "react"

import Slider from "../Slider"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { deserializeDuration } from "../../helpers"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("Progress")

const determineDuration = (data: { user: User } | undefined) =>
	(isUndefined(data) || isNull(data.user.current) ?
		0 : data.user.current.duration)

const Progress: FC<PropTypes> = ({ className }) => {
	const [ current, setCurrent ] = useState(0)
	return (
		<QueryApi<Data>
			spinner={false}
			query={GET_USER_CURRENT}
			children={
				data => {
					const duration = determineDuration(data)
					return (
						<div className={bem(className, "")}>
							<p className="Text">{deserializeDuration(current)}</p>
							<Slider
								val={0.8}
								onChange={setCurrent}
								className={bem("slider")}
							/>
							<p className="Text">{deserializeDuration(duration)}</p>
						</div>
					)
				}
			}
		/>
	)
}

interface PropTypes {
	className?: BemInput,
}

interface Data {
	user: User,
}

export default Progress
import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, ChangeEventHandler, FC } from "react"

import QueryApi from "../QueryApi"
import { User } from "../../types"
import { deserializeDuration } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { useCurrentContext } from "../../contexts/Current"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("Progress")

const determineDuration = (data: { user: User } | undefined) =>
	(isUndefined(data) || isNull(data.user.current) ?
		0 : data.user.current.duration)

const Progress: FC<PropTypes> = ({ className }) => {
	const userId =
		useUserContext()
	const { current, setCurrent } =
		useCurrentContext()
	const handleChange: ChangeEventHandler<HTMLInputElement> =
		event => setCurrent(parseInt(event.target.value))
	return (
		<QueryApi
			spinner={false}
			variables={{ userId }}
			query={GET_USER_CURRENT}
			children={
				(data: Data) => {
					const duration = determineDuration(data)
					return (
						<div className={bem(className, "")}>
							<p
								className="Text"
								children={deserializeDuration(current)}
							/>
							<input
								min={0}
								step={1}
								type="range"
								max={duration}
								value={current}
								onChange={handleChange}
								className={bem("slider")}
							/>
							<p
								className="Text"
								children={deserializeDuration(duration)}
							/>
						</div>
					)
				}
			}
		/>
	)
}

interface Data {
	user: User,
}

interface PropTypes {
	className?: BemInput,
}

export default Progress
import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, ChangeEventHandler, FC, Fragment } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useUserContext } from "../../contexts/User"
import { useCurrentContext } from "../../contexts/Current"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("Progress")

const determineDuration = (data: Data | undefined) =>
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
			variables={{ userId }}
			query={GET_USER_CURRENT}
			className={bem(className, "")}
			children={
				(data: Data | undefined) => {
					const duration = determineDuration(data)
					return (
						<Fragment>
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
						</Fragment>
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
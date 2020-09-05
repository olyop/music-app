import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"
import { createBem, BemPropTypes } from "@oly_op/bem"
import { createElement, ChangeEventHandler, FC, Fragment } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	useDispatch,
	updateCurrent,
	useStateUserId,
	useStateCurrent,
} from "../../redux"

import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("Progress")

const determineDuration = (data: Data | undefined) =>
	(isUndefined(data) || isNull(data.user.current) ?
		0 : data.user.current.duration)

const Progress: FC<BemPropTypes> = ({ className }) => {
	const dispatch =
		useDispatch()
	const userId =
		useStateUserId()
	const current =
		useStateCurrent()
	const handleChange: ChangeEventHandler<HTMLInputElement> =
		event => dispatch(updateCurrent(parseInt(event.target.value)))
	return (
		<QueryApi<Data>
			variables={{ userId }}
			query={GET_USER_CURRENT}
			className={bem(className, "")}
			children={
				({ data }) => {
					const duration = determineDuration(data)
					return (
						<Fragment>
							<p
								className={bem("text", "Text")}
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
								className={bem("text", "Text")}
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

export default Progress
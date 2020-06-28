import { isUndefined, isNull } from "lodash"
import Slider from "@material-ui/core/Slider"
import { createElement, useState, FC, ChangeEvent } from "react"

import QueryApi from "../QueryApi"
import { BemInputType, User } from "../../types"
import { deserializeDuration, reactBem } from "../../helpers"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = reactBem("Progress")

const determineDuration = (data: { user: User } | undefined) =>
	(isUndefined(data) || isNull(data.user.current) ?
		0 : data.user.current.duration)

const Progress: FC<PropTypes> = ({ className }) => {
	const [ current, setCurrent ] =
		useState(0)
	const handleChange = (event: ChangeEvent<{ value: number }>) =>
		setCurrent(event.target.value)
	return (
		<QueryApi<TData>
			spinner={false}
			query={GET_USER_CURRENT}
			children={
				data => {
					const duration = determineDuration(data)
					return (
						<div className={bem(className, "")}>
							<p className="Text">{deserializeDuration(current)}</p>
							<div className={bem("slider")}>
								<Slider
									min={0}
									step={1}
									max={duration}
									value={current}
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									onChange={handleChange}
								/>
							</div>
							<p className="Text">{deserializeDuration(duration)}</p>
						</div>
					)
				}
			}
		/>
	)
}

type PropTypes = {
	className?: BemInputType,
}

type TData = {
	user: User,
}

export default Progress
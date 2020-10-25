import { createBem } from "@oly_op/bem"
import { useMutation } from "@apollo/client"
import { createElement, FC, Fragment } from "react"

import Songs from "../Songs"
import Button from "../Button"
import QueryApi from "../QueryApi"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import CLEAR_USER_NEXT from "./userClearNext.gql"
import GET_USER_QUEUES from "./getUserQueues.gql"
import createQueuesArray from "./createQueuesArray"
import CLEAR_USER_QUEUES from "./userClearQueue.gql"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }

	const [ clearNext ] =
		useMutation<ClearNextData, UserVar>(CLEAR_USER_NEXT, {
			variables,
			optimisticResponse: {
				userClearNext: {
					userId,
					prev: [],
					next: [],
					later: [],
					__typename: "User",
				},
			},
		})

	const [ clearQueue ] =
		useMutation<ClearQueueData, UserVar>(CLEAR_USER_QUEUES, {
			variables,
			optimisticResponse: {
				userClearQueue: {
					userId,
					prev: [],
					next: [],
					later: [],
					current: null,
					__typename: "User",
				},
			},
		})

	return (
		<QueryApi<QueryData, Vars>
			variables={variables}
			query={GET_USER_QUEUES}
			className={bem("", "Content PaddingTop PaddingBottom")}
			children={({ data }) => data && (
				<Fragment>
					{createQueuesArray(data.user).map(queue => (
						<div
							key={queue.id}
							className={bem("section", "ItemBorder MarginBottomHalf")}
						>
							<p className={bem("section-text")}>
								{queue.name}
							</p>
							<Songs
								hideOrderBy
								includeIndexInKey
								songs={queue.songs}
							/>
						</div>
					))}
					{data.user.current && (
						<div className="FlexListGap MarginTop">
							<Button
								icon="clear_all"
								text="Clear Next"
								onClick={() => clearNext()}
							/>
							<Button
								icon="close"
								text="Clear Queue"
								onClick={() => clearQueue()}
							/>
						</div>
					)}
				</Fragment>
			)}
		/>
	)
}

type UserRes =
	Pick<
	User,
	"next" |
	"prev" |
	"later" |
	"userId" |
	"current" |
	"__typename"
	>

interface QueryData {
	user: User,
}

interface ClearQueueData {
	userClearQueue: UserRes,
}

interface ClearNextData {
	userClearNext: Omit<UserRes, "current">,
}

interface Vars {
	userId: string,
}

export default Queues
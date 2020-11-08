import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Songs from "../Songs"
import Button from "../Button"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import CLEAR_USER_NEXT from "./userClearNext.gql"
import GET_USER_QUEUES from "./getUserQueues.gql"
import createQueuesArray from "./createQueuesArray"
import CLEAR_USER_QUEUES from "./userClearQueue.gql"
import { useQuery, useMutation } from "../../helpers"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }

	const { data } =
		useQuery<QueryData, Vars>(GET_USER_QUEUES, {
			variables,
		})

	const [ clearNext, { loading: nextLoading } ] =
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

	const [ clearQueue, { loading: clearLoading } ] =
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

	const handleNext = () => clearNext()
	const handleQueue = () => clearQueue()

	return (
		<div className={bem("", "Content PaddingTop PaddingBottom")}>
			{data && (
				<Fragment>
					{createQueuesArray(data.user).map(queue => (
						<details
							key={queue.id}
							className="MarginBottom"
							open={queue.name !== "Previous"}
						>
							<summary className="Text2 MarginBottomHalf">
								{queue.name}
							</summary>
							<Songs
								hideOrderBy
								includeIndexInKey
								songs={queue.songs}
								className={bem("section", "ItemBorder MarginBottomHalf")}
							/>
						</details>
					))}
					{data.user.current && (
						<div className="FlexListGap">
							<Button
								icon="clear_all"
								text="Clear Next"
								onClick={nextLoading ? undefined : handleNext}
							/>
							<Button
								icon="close"
								text="Clear Queue"
								onClick={clearLoading ? undefined : handleQueue}
							/>
						</div>
					)}
				</Fragment>
			)}
		</div>
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
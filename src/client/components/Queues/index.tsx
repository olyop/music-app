import { createBem } from "@oly_op/bem"
import { useState, createElement, FC, Fragment } from "react"

import Songs from "../Songs"
import Button from "../Button"
import { useStateUserId } from "../../redux"
import CLEAR_USER_NEXT from "./userClearNext.gql"
import GET_USER_QUEUES from "./getUserQueues.gql"
import createQueuesArray from "./createQueuesArray"
import CLEAR_USER_QUEUES from "./userClearQueue.gql"
import { User, UserVar, QueueKey } from "../../types"
import { useQuery, useMutation } from "../../helpers"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }

	const [ open, setOpen ] = useState<Record<QueueKey, boolean>>({
		next: true,
		later: true,
		prev: false,
		current: true,
	})

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

	const handleDetailsToggle =
		(key: QueueKey) =>
			() => setOpen(prevState => ({
				...prevState,
				[key]: !prevState[key],
			}))

	return (
		<div className={bem("", "Content PaddingTop PaddingBottom")}>
			{data && (
				<Fragment>
					<h1 className="Heading1 MarginBottom">
						Queues
					</h1>
					<div className="Elevated MarginBottom">
						{createQueuesArray(data.user).map(queue => (
							<details
								key={queue.id}
								open={open[queue.id]}
								className="ItemBorder"
								onChange={handleDetailsToggle(queue.id)}
							>
								<summary className={bem("summary", "Text2 PaddingHalf")}>
									{queue.name}
									<Fragment> (</Fragment>
									{queue.songs.length}
									<Fragment>)</Fragment>
								</summary>
								<Songs
									hideOrderBy
									hideElevated
									hideInLibrary
									songs={queue.songs}
									className={bem("section")}
								/>
							</details>
						))}
					</div>
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
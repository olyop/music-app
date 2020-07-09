import isNull from "lodash/isNull"
import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Song from "../Song"
import QueueApi from "../QueryApi"
import { User } from "../../types"
import { createQueuesArray } from "../../helpers"
import GET_USER_QUEUES from "../../graphql/queries/userQueues.gql"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => (
	<QueueApi
		className={bem("")}
		query={GET_USER_QUEUES}
		children={
			({ user }: Data) => (
				createQueuesArray(user).map(
					queue => (
						isNull(queue.songs[0]) || isEmpty(queue.songs) ? null : (
							<div key={queue.id} className={bem("section", queue.key)}>
								<p className={bem("section-text")}>{queue.name}</p>
								{queue.songs.map(song => <Song song={song}/>)}
							</div>
						)
					),
				)
			)
		}
	/>
)

interface Data {
	user: User,
}

export default Queues
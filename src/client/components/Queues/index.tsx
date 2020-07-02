// eslint-disable react/no-array-index-key
import { createBem } from "@oly_op/bem"
import { isEmpty, isNull } from "lodash"
import { createElement, FC } from "react"

import Song from "../Song"
import QueueApi from "../QueryApi"
import { createQueuesArray } from "../../helpers"
import GET_USER_QUEUES from "../../graphql/queries/userQueues.gql"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => (
	<div className={bem("")}>
		<QueueApi
			query={GET_USER_QUEUES}
			children={
				({ user }) => createQueuesArray(user).map(
					queue => (
						isNull(queue.songs[0]) || isEmpty(queue.songs) ? null : (
							<div key={queue.id} className={bem("section", queue.key)}>
								<p className={bem("section-text")}>{queue.name}</p>
								{queue.songs.map(song => <Song song={song}/>)}
							</div>
						)
					),
				)
			}
		/>
	</div>
)

export default Queues
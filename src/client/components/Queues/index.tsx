import isNull from "lodash/isNull"
import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import QueueApi from "../QueryApi"
import { User } from "../../types"
import { createQueuesArray } from "../../helpers"
import GET_USER_QUEUES from "../../graphql/queries/userQueues.gql"

import "./index.scss"
import { useUserContext } from "../../contexts/User"

const bem = createBem("Queues")

const Queues: FC = () => (
	<QueueApi<Res, Vars>
		className={bem("")}
		query={GET_USER_QUEUES}
		variables={{ userId: useUserContext() }}
		children={
			res => res && (
				createQueuesArray(res.user).map(
					queue => (
						<Fragment key={queue.id}>
							{isNull(queue.songs[0]) || isEmpty(queue.songs) ? null : (
								<div className={bem("section", queue.key)}>
									<p className={bem("section-text")}>{queue.name}</p>
									{queue.songs.map(song => (
										<Song
											song={song}
											key={song.songId}
										/>
									))}
								</div>
							)}
						</Fragment>
					),
				)
			)
		}
	/>
)

interface Res {
	user: User,
}

interface Vars {
	userId: string,
}

export default Queues
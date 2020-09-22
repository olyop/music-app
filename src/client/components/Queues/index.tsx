import isNull from "lodash/isNull"
import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useStateUserId } from "../../redux"
import { createQueuesArray } from "../../helpers"
import GET_USER_QUEUES from "../../graphql/queries/userQueues.gql"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => (
	<QueryApi<Data, Vars>
		className={bem("")}
		query={GET_USER_QUEUES}
		variables={{ userId: useStateUserId() }}
		children={
			({ data }) => data && (
				createQueuesArray(data.user).map(
					queue => (
						<Fragment key={queue.id}>
							{isNull(queue.songs[0]) || isEmpty(queue.songs) ? null : (
								<div className={bem("section", "Elevated Padding")}>
									<p className={bem("section-text")}>{queue.name}</p>
									{queue.songs.map(
										(song, index) => (
											<Song
												song={song}
												key={song.songId + index.toString()}
												className={bem("section-song", "ItemBorder")}
											/>
										),
									)}
								</div>
							)}
						</Fragment>
					),
				)
			)
		}
	/>
)

interface Data {
	user: User,
}

interface Vars {
	userId: string,
}

export default Queues
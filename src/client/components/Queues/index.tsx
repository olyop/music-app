import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { useMutation } from "@apollo/client"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import Icon from "../Icon"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useStateUserId } from "../../redux"
import GET_USER_QUEUES from "./getUserQueues.gql"
import { createQueuesArray } from "../../helpers"
import CLEAR_USER_QUEUES from "./clearUserQueue.gql"

import "./index.scss"

const bem = createBem("Queues")

const Queues: FC = () => {
	const userId = useStateUserId()
	const variables = { userId }
	const [ clear ] = useMutation(CLEAR_USER_QUEUES, { variables })
	return (
		<QueryApi<Data, Vars>
			className={bem("", "Content PaddingTop PaddingBottom")}
			variables={variables}
			query={GET_USER_QUEUES}
			children={({ data }) => data && (
				<Fragment>
					{createQueuesArray(data.user).map(
						queue => (
							<Fragment key={queue.id}>
								{isEmpty(queue.songs) ? null : (
									<div className={bem("section", "Elevated Padding")}>
										<p className={bem("section-text")}>
											{queue.name}
										</p>
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
					)}
					<Icon
						icon="close"
						onClick={() => clear()}
						className={bem("close")}
					/>
				</Fragment>
			)}
		/>
	)
}

interface Data {
	user: User,
}

interface Vars {
	userId: string,
}

export default Queues
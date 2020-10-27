import {
	FC,
	useRef,
	useEffect,
	createElement,
} from "react"

import uniqueId from "lodash/uniqueId"
import { createBem, BemPropTypes } from "@oly_op/bem"
import { useQuery, useMutation } from "@apollo/client"

import {
	addError,
	updatePlay,
	addLoading,
	useDispatch,
	useStatePlay,
	updateCurrent,
	removeLoading,
	useStateUserId,
} from "../../redux"

import Icon from "../Icon"
import { determineDocId } from "../../helpers"
import { User, UserDoc, Song } from "../../types"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import UPDATE_USER_PLAY from "./updateUserCurrent.gql"

const isSong = (doc: UserDoc): doc is Song =>
	doc.__typename === "Song"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const songId = determineDocId(doc)
	const queryId = useRef(uniqueId())

	const { data } =
		useQuery<UserCurrentRes>(GET_USER_CURRENT, {
			variables: { userId },
			fetchPolicy: "cache-first",
		})

	const [ userPlay, { error, loading } ] =
		useMutation<UserPlayRes>(UPDATE_USER_PLAY, {
			variables: { songId, userId },
			optimisticResponse: isSong(doc) ? {
				updateUserCurrent: {
					userId,
					current: doc,
					__typename: "User",
				},
			} : undefined,
		})

	const isCurrent = (
		data &&
		data.user.current &&
		data.user.current.songId === songId
	)

	const handleClick = () => {
		if (isSong(doc)) {
			if (isCurrent) {
				dispatch(updatePlay(!play))
			} else {
				dispatch(updateCurrent(0))
				dispatch(updatePlay(false))
				userPlay().catch(console.error)
			}
		}
	}

	useEffect(() => {
		if (loading) dispatch(addLoading(queryId.current))
		else dispatch(removeLoading(queryId.current))
	}, [dispatch, loading])

	useEffect(() => {
		if (error) {
			dispatch(addError(error))
		}
	}, [error, dispatch])

	return (
		<Icon
			title="Play"
			onClick={handleClick}
			className={bem(className, "Hover")}
			icon={isCurrent && play ? "pause" : "play_arrow"}
		/>
	)
}

interface UserPlayRes {
	updateUserCurrent: Pick<User, "userId" | "current" | "__typename">,
}

interface UserCurrentRes {
	user: User,
}

interface PropTypes extends BemPropTypes {
	doc: UserDoc,
}

export default PlayButton
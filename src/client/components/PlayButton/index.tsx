import { useMutation } from "@apollo/react-hooks"
import { createElement, ReactElement } from "react"

import Icon from "../Icon"
import ApiError from "../ApiError"
import { determineDocId } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import { BemInputType, LibDoc, TDataUserPlay as TData } from "../../types"

const PlayButton = <TDoc extends LibDoc>({ doc, className }: TProps<TDoc>): ReactElement => {
	const { isCurrent } = doc
	const userId = useUserContext()
	const docId = determineDocId(doc)
	const { play, togglePlay } = usePlayContext()

	const [ userPlay, { error } ] =
		useMutation<TData, TVars>(USER_PLAY, { variables: { userId, docId } })

	if (error) {
		return <ApiError error={error}/>
	}

	const handleClick = () => (isCurrent ? togglePlay : userPlay)()
	const icon = isCurrent && play ? "pause" : "play_arrow"

	return (
		<Icon
			icon={icon}
			title="Play"
			onClick={handleClick}
			className={[className, "IconHover"].join(" ")}
		/>
	)
}

type TVars = {
	docId: string,
	userId: string,
}

type TProps<TDoc> = {
	doc: TDoc,
	className?: BemInputType,
}

export default PlayButton
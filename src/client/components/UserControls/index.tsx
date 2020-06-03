import { createElement, FC } from "react"
import { useMutation } from "@apollo/react-hooks"

import Icon from "../Icon"
import { reactBem } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PREV from "../../graphql/mutations/userPrev.gql"
import USER_NEXT from "../../graphql/mutations/userNext.gql"

import "./index.scss"
import { BemInputType } from "../../types"

const bem = reactBem("UserControls")

const UserControls: FC<PropTypes> = ({ className, iconClassName }) => {
	const userId = useUserContext()
	const { play, togglePlay } = usePlayContext()

	const variables = { userId }
	const [userPrev] = useMutation(USER_PREV, { variables })
	const [userNext] = useMutation(USER_NEXT, { variables })

	const handlePrevClick = () => userPrev()
	const handlePlayClick = () => togglePlay()
	const handleNextClick = () => userNext()

	return (
		<div className={bem(className, "")}>
			<Icon
				icon="skip_previous"
				onClick={handlePrevClick}
				className={bem(iconClassName, "icon")}
			/>
			<Icon
				onClick={handlePlayClick}
				icon={play ? "pause" : "play_arrow"}
				className={bem(iconClassName, "icon")}
			/>
			<Icon
				icon="skip_next"
				onClick={handleNextClick}
				className={bem(iconClassName, "icon")}
			/>
		</div>
	)
}

type PropTypes = {
	className?: BemInputType,
	iconClassName?: BemInputType,
}

export default UserControls
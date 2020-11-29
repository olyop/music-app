import { Link } from "react-router-dom"
import { createElement, FC, ReactNode } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	Doc,
	Modal,
} from "../../types"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import PlayButton from "./PlayButton"
import InLibraryButton from "./InLibraryButton"
import { useDispatch, changeModal } from "../../redux"

import "./index.scss"

const bem = createBem("Item")

const Item: FC<PropTypes> = ({
	left,
	play,
	right,
	lower,
	upper,
	modal,
	imgDoc,
	className,
	inLibrary,
	infoClassName,
	iconClassName,
	rightClassName,
}) => {
	const dispatch = useDispatch()
	const handleMore = () => modal && dispatch(changeModal(modal))
	return (
		<div className={bem(className)}>
			<div className={bem("")}>
				{left && (
					<p
						children={left}
						className={bem("left", "Text")}
					/>
				)}
				{play && (
					<PlayButton
						play={play.play}
						onClick={play.onClick}
						className={bem(iconClassName, "play")}
					/>
				)}
				{imgDoc && (
					<Link
						className={bem("img-link")}
						to={determineDocPath(imgDoc)}
						title={determineDocName(imgDoc)}
						children={(
							<Img
								url={determineDocPhoto(imgDoc)}
								className={bem("img", "Card", "Elevated")}
							/>
						)}
					/>
				)}
				<div className={bem(infoClassName, "info")}>
					<div className={bem("info-left")}>
						<p
							children={upper}
							className={bem("info-left-upper", "Text2")}
						/>
						{lower && (
							<p
								children={lower}
								className={bem("info-left-lower", "Text")}
							/>
						)}
					</div>
					{right && (
						<p
							children={right}
							className={bem(rightClassName, "info-right", "Text")}
						/>
					)}
				</div>
				{inLibrary && (
					<InLibraryButton
						onClick={inLibrary.onClick}
						inLibrary={inLibrary.inLibrary}
						className={bem(iconClassName, "add")}
					/>
				)}
				<Icon
					icon="more_vert"
					onClick={handleMore}
					className={bem(iconClassName, "more")}
				/>
			</div>
		</div>
	)
}

interface PlayInput {
	play: boolean,
	onClick: () => void,
}

interface InLibraryInput {
	inLibrary: boolean,
	onClick: () => void,
}

interface PropTypes extends BemPropTypes {
	imgDoc?: Doc,
	modal?: Modal,
	play?: PlayInput,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	infoClassName?: BemInput,
	iconClassName?: BemInput,
	rightClassName?: BemInput,
	inLibrary?: InLibraryInput,
}

export default Item
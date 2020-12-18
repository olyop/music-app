import { Link } from "react-router-dom"
import { useState, createElement, FC, ReactNode } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import Modal from "../Modal"
import PlayButton from "./PlayButton"
import ModalButton from "../Modal/ModalButton"
import InLibraryButton from "./InLibraryButton"
import { Doc, ModalButton as TModalButton } from "../../types"

import "./index.scss"

const bem = createBem("Item")

const Item: FC<PropTypes> = ({
	left,
	play,
	right,
	lower,
	upper,
	imgDoc,
	className,
	inLibrary,
	modalButtons,
	infoClassName,
	iconClassName,
	rightClassName,
}) => {
	const [ modal, setModal ] = useState(false)
	const handleModalOpen = () => setModal(true)
	const handleModalClose = () => setModal(false)
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
				{modalButtons && (
					<Icon
						icon="more_vert"
						onClick={handleModalOpen}
						className={bem(iconClassName, "more")}
					/>
				)}
				{modalButtons && modal && (
					<Modal onClose={handleModalClose}>
						{modalButtons.map(
							button => (
								<ModalButton
									button={button}
									key={button.text}
									onClose={handleModalClose}
								/>
							),
						)}
					</Modal>
				)}
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
	play?: PlayInput,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	infoClassName?: BemInput,
	iconClassName?: BemInput,
	rightClassName?: BemInput,
	inLibrary?: InLibraryInput,
	modalButtons?: TModalButton[],
}

export default Item
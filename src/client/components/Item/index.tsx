import uniqueId from "lodash/uniqueId"
import { Link } from "react-router-dom"
import { useState, createElement, FC, ReactNode, Fragment } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Modal, {
	ModalButton,
	ModalHeaderPropTypes,
	ModalButtonPropTypes,
} from "../Modal"

import Img from "../Img"
import Icon from "../Icon"
import PlayButton from "./PlayButton"
import { Doc, Handler } from "../../types"
import InLibraryButton from "./InLibraryButton"

import "./index.scss"

const bem = createBem("Item")

const Item: FC<PropTypes> = ({
	left,
	play,
	imgDoc,
	onClick,
	className,
	inLibrary,
	modalHeader,
	modalButtons,
	infoClassName,
	iconClassName,
	rightClassName,
	info: {
		upperLeft,
		lowerLeft,
		rightLeft,
		rightRight,
	},
}) => {
	const [ modal, setModal ] = useState(false)
	const handleModalOpen = () => setModal(true)
	const handleModalClose = () => setModal(false)
	return (
		<div className={bem(className)} onClick={onClick}>
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
							children={upperLeft}
							className={bem("info-left-upper", "Text2")}
						/>
						{lowerLeft && (
							<p
								children={lowerLeft}
								className={bem("info-left-lower", "Text")}
							/>
						)}
					</div>
					{(rightLeft || rightRight) && (
						<p className={bem(rightClassName, "info-right", "Text")}>
							{rightLeft}
							{(rightLeft && rightRight) && (
								<Fragment> &#8226; </Fragment>
							)}
							{rightRight}
						</p>
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
					<Modal header={modalHeader} onClose={handleModalClose}>
						{modalButtons.map(
							button => (
								<ModalButton
									{...{
										...button,
										handler: () => {
											handleModalClose()
											if (button.handler) button.handler()
										},
									}}
									key={uniqueId()}
								/>
							),
						)}
					</Modal>
				)}
			</div>
		</div>
	)
}

export interface InfoConfig {
	upperLeft?: ReactNode,
	lowerLeft?: ReactNode,
	rightLeft?: ReactNode,
	rightRight?: ReactNode,
}

export interface PlayConfig {
	play: boolean,
	onClick?: Handler,
}

export interface InLibraryConfig {
	onClick?: Handler,
	inLibrary: boolean,
}

export interface PropTypes extends BemPropTypes {
	imgDoc?: Doc,
	left?: ReactNode,
	info: InfoConfig,
	play?: PlayConfig,
	onClick?: Handler,
	infoClassName?: BemInput,
	iconClassName?: BemInput,
	rightClassName?: BemInput,
	inLibrary?: InLibraryConfig,
	modalHeader?: ModalHeaderPropTypes,
	modalButtons?: ModalButtonPropTypes[],
}

export default Item
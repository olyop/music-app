import { Link } from "react-router-dom"
import { createElement, Fragment, ReactNode, useState } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	determineDocPath,
	determineDocName,
	determineDocPhoto,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import Modal from "../Modal"
import PlayButton from "../PlayButton"
import InLibraryButton from "../InLibraryButton"
import { Doc, UserDoc, ModalButton } from "../../types"

import "./index.scss"

const showInLibrary =
	(hideInLibrary: boolean, doc: Doc): doc is UserDoc => !hideInLibrary
const determineShowPlay =
	(showPlay: boolean, doc: Doc): doc is UserDoc => showPlay

const bem = createBem("Item")

const Item = <D extends Doc, I extends Doc = Doc>({
	doc,
	left,
	lower,
	right,
	upper,
	imgDoc,
	className,
	modalButtons,
	infoClassName,
	iconClassName,
	rightClassName,
	showPlay = true,
	hideInLibrary = false,
}: PropTypes<D, I>) => {
	const [ modal, setModal ] = useState(false)
	const openMore = () => setModal(true)
	const closeMore = () => setModal(false)
	return (
		<Fragment>
			<div className={bem(className, "", "FlexList")}>
				{left && (
					<p
						children={left}
						className={bem("left", "Text")}
					/>
				)}
				{determineShowPlay(showPlay, doc) && (
					<PlayButton
						doc={doc}
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
				<div className={bem(infoClassName, "info", "FlexList")}>
					<div className={bem("info-left")}>
						<p
							children={upper}
							className={bem("info-left-upper", "Text2")}
						/>
						{lower ? (
							<p
								children={lower}
								className={bem("info-left-lower", "Text")}
							/>
						) : null}
					</div>
					{right && (
						<p
							children={right}
							className={bem(rightClassName, "info-right", "Text")}
						/>
					)}
				</div>
				{showInLibrary(hideInLibrary, doc) && (
					<InLibraryButton
						doc={doc}
						className={bem(iconClassName)}
					/>
				)}
				<Icon
					icon="more_vert"
					onClick={openMore}
					className={bem(iconClassName, "more")}
				/>
			</div>
			{modal && modalButtons && (
				<Modal
					onClose={closeMore}
					buttons={modalButtons}
					className={bem("modal")}
				/>
			)}
		</Fragment>
	)
}

interface PropTypes<Doc, ImgDoc> extends BemPropTypes {
	doc: Doc,
	imgDoc?: ImgDoc,
	left?: ReactNode,
	upper: ReactNode,
	lower?: ReactNode,
	right?: ReactNode,
	showPlay?: boolean,
	hideInLibrary?: boolean,
	infoClassName?: BemInput,
	iconClassName?: BemInput,
	rightClassName?: BemInput,
	modalButtons?: ModalButton[],
}

export default Item